from django.contrib.auth import get_user_model
from django.db import transaction, IntegrityError
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from djoser.utils import decode_uid

from .models import Workspace, WorkspaceMembership


User = get_user_model()


class WorkspaceMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkspaceMembership
        fields = ("user", "role")


class WorkspaceSerializer(serializers.ModelSerializer):
    memberships = WorkspaceMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Workspace
        fields = ("id", "name", "description", "created", "updated", "memberships")
        depth = 1

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.save()
        return super().update(instance, validated_data)

    # def get_fields(self):
    #     fields = super().get_fields()

    #     # Apply the IsMemberOfWorkspace permission to the memberships field
    #     request = self.context.get("request")
    #     if request and not request.user.is_anonymous:
    #         fields["memberships"].child.context.update({"request": request})
    #         fields["memberships"].child.parent = self
    #         fields["memberships"].child.fields["user"].context.update(
    #             {"request": request}
    #         )
    #         fields["memberships"].child.fields["user"].parent = self
    #         fields["memberships"].child.fields["user"].child.fields[
    #             "email"
    #         ].read_only = True

    #     return fields


class WorkspaceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ("name", "description")

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
