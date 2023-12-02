import { apiSlice } from "../services/apiSlice";

export interface WorkspaceResult {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  campaign: string;
}

interface Workspace {
  count: number;
  next: null | number;
  previous: null | number;
  results: WorkspaceResult[];
}

const workspaceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retriveWorkspaces: builder.query<Workspace, void>({
      query: () => "/workspace/",
      providesTags: ["Workspace"],
    }),
    createWorkspace: builder.mutation({
      query: ({ name, description }) => ({
        url: "/workspace/",
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Workspace"],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          workspaceApiSlice.util.updateQueryData(
            "retriveWorkspaces",
            id,
            (draft) => {
              Object.assign(draft);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    retriveWorkspace: builder.query({
      query: ({ id }) => ({
        url: `/workspace/${id}`,
      }),
    }),
    updateWorkspace: builder.mutation({
      query: ({ id, name, description }) => ({
        url: `workspace/${id}`,
        method: "PUT",
        body: { id, name, description },
      }),
    }),
    partialUpdateWorkspace: builder.mutation({
      query: ({ id, name, description }) => ({
        url: `workspace/${id}`,
        method: "POST",
        body: { id, name, description },
      }),
    }),
    deleteWorkspace: builder.mutation({
      query: ({ id }) => ({
        url: `workspace/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Workspace"],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          workspaceApiSlice.util.updateQueryData(
            "retriveWorkspaces",
            id,
            (draft) => {
              Object.assign(draft);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    inviteToWorkspace: builder.mutation({
      query: ({ id, email, role }) => ({
        url: `/workspace/${id}/invite/`,
        method: "POST",
        body: { id, email, role },
      }),
    }),
    acceptInviteToWorkspace: builder.mutation({
      query: ({ id, email, role, token }) => ({
        url: `/workspace/${id}/invite/accept/`,
        method: "POST",
        body: { id, email, role, token },
      }),
    }),
  }),
});

export const {
  useRetriveWorkspacesQuery,
  useRetriveWorkspaceQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  usePartialUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useInviteToWorkspaceMutation,
  useAcceptInviteToWorkspaceMutation,
} = workspaceApiSlice;
