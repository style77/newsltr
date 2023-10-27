from django.contrib.auth import get_user_model, tokens
from django.http import QueryDict
from rest_framework import mixins, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound

from drf_spectacular.utils import extend_schema, OpenApiParameter

from .serializers import (
    APIKeyDestroySerializer,
    APIKeySerializer,
    WorkspaceMembershipSerializer,
    WorkspaceSerializer,
    WorkspaceCreateSerializer,
    WorkspaceInviteSerializer,
    WorkspaceInvitationAcceptSerializer,
)
from .permissions import (
    IsMemberOfWorkspace,
    IsAdminOfWorkspace,
    IsSubscriptionActive,
    CanCreateWorkspace,
    CanInviteMoreMembers,
)
from .models import Workspace, WorkspaceAPIKey, WorkspaceMembership
from .email import WorkspaceInvitationEmail


User = get_user_model()


@extend_schema(
    tags=["workspace"],
)
class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsMemberOfWorkspace,
        IsSubscriptionActive,
    ]
    queryset = Workspace.objects.all()

    token_generator = tokens.default_token_generator

    def get_queryset(self):
        if self.action == "list" and not self.request.user.is_staff:
            return super().get_queryset().filter(memberships__user=self.request.user)
        return super().get_queryset()

    def get_permissions(self):
        if self.action in ["create"]:
            self.permission_classes = [
                permissions.IsAuthenticated,
                IsSubscriptionActive,
                CanCreateWorkspace,
            ]
        elif self.action in ["destroy"]:
            self.permission_classes = [
                permissions.IsAuthenticated,
                IsAdminOfWorkspace,
            ]
        elif self.action in ["update", "partial_update"]:
            self.permission_classes = [
                permissions.IsAuthenticated,
                IsSubscriptionActive,
                IsAdminOfWorkspace,
            ]
        elif self.action in ["invite"]:
            self.permission_classes = [
                permissions.IsAuthenticated,
                IsSubscriptionActive,
                IsAdminOfWorkspace,
                CanInviteMoreMembers,
            ]
        elif self.action in ["invitation_accept"]:
            self.permission_classes = [
                permissions.IsAuthenticated,
                CanInviteMoreMembers,
            ]
        elif self.action in ["retrieve"]:
            self.permission_classes = [
                permissions.IsAuthenticated,
                IsMemberOfWorkspace,
            ]
        elif self.action in ["list"]:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return WorkspaceCreateSerializer
        elif self.action == "invite":
            return WorkspaceInviteSerializer
        elif self.action == "invitation_accept":
            return WorkspaceInvitationAcceptSerializer
        return self.serializer_class

    def list(self, request, *args, **kwargs):
        """
        List all workspaces that the user is a member of.
        """
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve workspace.
        """
        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new workspace.
        """
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """
        Update workspace.
        """
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update workspace.
        """
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Delete workspace.
        """
        instance = self.get_object()

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=True, url_path="invite")
    def invite(self, request, pk, *args, **kwargs):
        """
        Invite user to workspace.
        """
        workspace = self.get_object()
        if not workspace:
            raise NotFound()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = get_user_model().objects.get(
                email=serializer.validated_data.get("email")
            )
        except User.DoesNotExist:
            return Response(
                data={"detail": "User with such email not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        context = {
            "user": user,
            "workspace": workspace,
            "role": serializer.validated_data.get("role"),
        }
        to = [serializer.validated_data.get("email")]

        WorkspaceInvitationEmail(self.request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False, url_path="invite/accept")
    def invitation_accept(self, request, *args, **kwargs):
        """
        Accept invitation to workspace.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.user != self.request.user:
            return Response(
                data={"detail": "You can't accept invitation for other user."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        membership = WorkspaceMembership(
            workspace=serializer.workspace, user=serializer.user, role="member"
        )  # todo add possibility to invite with different role
        membership.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(
    tags=["workspace members"],
)
class WorkspaceMembersViewSet(
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = WorkspaceMembershipSerializer
    permission_classes = [IsMemberOfWorkspace, permissions.IsAuthenticated]
    queryset = WorkspaceMembership
    lookup_field = "user__pk"

    def get_queryset(self):
        return WorkspaceMembership.objects.filter(workspace=self.kwargs["workspace_pk"])

    def get_serializer_class(self):
        return super().get_serializer_class()

    def get_permissions(self):
        if self.action in ["invite", "update", "partial_update", "destroy"]:
            self.permission_classes = [permissions.IsAuthenticated, IsAdminOfWorkspace]
        elif self.action in ["invitation_accept"]:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    @extend_schema(
        parameters=[OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH)],
    )
    def list(self, request, *args, **kwargs):
        """
        List workspace members.
        """
        return super().list(request, *args, **kwargs)

    @extend_schema(
        parameters=[
            OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH),
            OpenApiParameter("user__pk", str, OpenApiParameter.PATH),
        ],
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve workspace member.
        """
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        parameters=[
            OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH),
            OpenApiParameter("user__pk", str, OpenApiParameter.PATH),
        ],
    )
    def update(self, request, *args, **kwargs):
        """
        Update workspace member.
        """
        return super().update(request, *args, **kwargs)

    @extend_schema(
        parameters=[
            OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH),
            OpenApiParameter("user__pk", str, OpenApiParameter.PATH),
        ],
    )
    def partial_update(self, request, *args, **kwargs):
        """
        Partial update workspace member.
        """
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(
        parameters=[
            OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH),
            OpenApiParameter("user__pk", str, OpenApiParameter.PATH),
        ],
    )
    def destroy(self, request, *args, **kwargs):
        """
        Delete workspace member.
        """
        return super().destroy(request, *args, **kwargs)


@extend_schema(
    tags=["workspace keys"],
)
class WorkspaceKeysViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = APIKeySerializer
    permission_classes = [IsAdminOfWorkspace, permissions.IsAuthenticated]
    queryset = WorkspaceAPIKey
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return WorkspaceAPIKey.objects.filter(workspace=self.kwargs["workspace_pk"])

    def get_serializer_class(self):
        if self.action == "destroy":
            return APIKeyDestroySerializer
        return super().get_serializer_class()

    def get_permissions(self):
        return super().get_permissions()

    @extend_schema(
        parameters=[
            OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH),
            OpenApiParameter("id", str, OpenApiParameter.PATH),
        ],
    )
    def destroy(self, request, *args, **kwargs):
        """
        Revoke a workspace API Key
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.revoked = True
        instance.save()

    @extend_schema(
        parameters=[
            OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH),
        ],
    )
    def create(self, request, *args, **kwargs):
        """
        Create a new workspace API Key
        """
        if isinstance(request.data, QueryDict):
            request.data._mutable = True
            request.data["workspace"] = self.kwargs["workspace_pk"]
        else:
            request.data.update({"workspace": self.kwargs["workspace_pk"]})
        return super().create(request, *args, **kwargs)

    @extend_schema(
        parameters=[OpenApiParameter("workspace_pk", str, OpenApiParameter.PATH)],
    )
    def list(self, request, *args, **kwargs):
        """
        List all workspace API Keys
        """
        return super().list(request, *args, **kwargs)
