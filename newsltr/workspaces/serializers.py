from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from djoser.utils import decode_uid
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from authorization.serializers import UserSerializer

from .models import Workspace, WorkspaceAPIKey, WorkspaceMembership
from .permissions import IsAdminOfWorkspace

User = get_user_model()


class WorkspaceMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = WorkspaceMembership
        fields = ("user", "role")

    def validate(self, attrs):
        if self.instance and self.instance.role == "admin":
            raise ValidationError("Cannot change role of admin.")

        elif self.instance and self.instance.user == self.context["request"].user:
            raise ValidationError("Cannot change own role.")

        elif attrs["role"] == "admin" and not IsAdminOfWorkspace().has_permission(
            self.context["request"], self.context["view"]
        ):
            raise ValidationError("Only admins can assign admin role.")

        return super().validate(attrs)


class APIKeySerializer(serializers.ModelSerializer):
    default_error_messages = {
        "cannot_create_api_key": "Cannot create API key for this workspace.",
        "too_many_api_keys": "Cannot create more than 5 API keys for workspace.",
    }

    class Meta:
        model = WorkspaceAPIKey
        fields = ("id", "name", "key", "revoked", "created")
        read_only_fields = ("id", "key", "revoked", "created")

    def create(self, validated_data):
        workspace = Workspace.objects.get(
            pk=self.context["request"].data.get("workspace")
        )
        validated_data["workspace"] = workspace

        if workspace.keys.count() >= 5:
            self.fail("too_many_api_keys")

        instance, _ = super().create(validated_data)
        return instance


class APIKeyDestroySerializer(serializers.ModelSerializer):
    ...


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ("id", "name", "description", "created", "updated", "campaign")
        read_only_fields = ("id", "created", "updated", "campaign")

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.save()
        return super().update(instance, validated_data)


class WorkspaceCreateSerializer(serializers.ModelSerializer):
    memberships = WorkspaceMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Workspace
        fields = ("id", "name", "description", "created", "updated", "memberships")
        read_only_fields = ("created", "updated", "id", "memberships")

    def create(self, validated_data):
        try:
            workspace = self.perform_create(validated_data)
        except IntegrityError:
            self.fail("cannot_create_workspace")

        return workspace

    def perform_create(self, validated_data):
        with transaction.atomic():
            workspace = Workspace.objects.create(**validated_data)
            WorkspaceMembership.objects.create(
                workspace=workspace,
                user=self.context["request"].user,
                role="admin",
            )
            return workspace


class WorkspaceInviteSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.ChoiceField(
        choices=[
            role for role in WorkspaceMembership.ROLE_CHOICES if role[0] != "admin"
        ],
        default="member",
    )


class WorkspaceInvitationAcceptSerializer(serializers.Serializer):
    uid = serializers.CharField()
    workspace_id = serializers.CharField()
    token = serializers.CharField()

    default_error_messages = {
        "invalid_token": "Invalid token for given user.",
        "invalid_uid": "Invalid user id.",
        "invalid_workspace_id": "Invalid workspace id.",
        "user_already_in_workspace": "User is already in workspace.",
    }

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        # uid validation have to be here, because validate_<field_name>
        # doesn't work with modelserializer
        try:
            uid = decode_uid(self.initial_data.get("uid", ""))
            self.user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            key_error = "invalid_uid"
            raise ValidationError(
                {"uid": [self.error_messages[key_error]]}, code=key_error
            )

        try:
            workspace_id = decode_uid(self.initial_data.get("workspace_id", ""))
            self.workspace = Workspace.objects.get(pk=workspace_id)
        except (Workspace.DoesNotExist, ValueError, TypeError, OverflowError):
            key_error = "invalid_workspace_id"
            raise ValidationError(
                {"workspace_id": [self.error_messages[key_error]]}, code=key_error
            )

        if self.workspace.memberships.filter(user=self.user).exists():
            key_error = "user_already_in_workspace"
            raise ValidationError(
                {"detail": [self.error_messages[key_error]]}, code=key_error
            )

        is_token_valid = self.context["view"].token_generator.check_token(
            self.user, self.initial_data.get("token", "")
        )
        if is_token_valid:
            return validated_data
        else:
            key_error = "invalid_token"
            raise ValidationError(
                {"token": [self.error_messages[key_error]]}, code=key_error
            )
