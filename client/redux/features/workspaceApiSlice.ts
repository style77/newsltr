import { MdWorkspacePremium } from "react-icons/md";
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
      providesTags: [{ type: "Workspace" }],
    }),
    createWorkspace: builder.mutation({
      query: ({ ...patch }) => ({
        url: "/workspace/",
        method: "POST",
        body: patch,
      }),
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          workspaceApiSlice.util.updateQueryData(
            "retriveWorkspaces",
            undefined,
            (draft) => {
              return {
                ...draft,
                results: [{ ...patch }],
              };
              // Object.assign(draft, patch);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(workspaceApiSlice.util.invalidateTags(["Workspace"]));

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
      // invalidatesTags: [{ type: "Workspace" }],
    }),
    retriveWorkspace: builder.query({
      query: ({ id }) => ({
        url: `/workspace/${id}`,
      }),
      providesTags: ["Workspace"],
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
        url: `workspace/${id}/`,
        method: "PATCH",
        body: { name, description },
      }),
      // invalidatesTags: ["Workspace"],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        console.log(id, patch);
        const patchResult = dispatch(
          workspaceApiSlice.util.updateQueryData(
            "retriveWorkspaces",
            undefined,
            (draft) => {
              const index = draft.results.findIndex(
                (workspace) => workspace.id === id,
              );
              console.log(index);
              const newValue = [...draft.results];
              newValue[index] = { id, ...patch };
              return {
                ...draft,
                results: newValue,
              };
              // Object.assign(draft, patch);
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
    deleteWorkspace: builder.mutation({
      query: ({ id }) => ({
        url: `workspace/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Workspace"],
      // async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     workspaceApiSlice.util.updateQueryData(
      //       "retriveWorkspaces",
      //       id,
      //       (draft) => {
      //         Object.assign(draft);
      //       },
      //     ),
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //
      //     /**
      //      * Alternatively, on failure you can invalidate the corresponding cache tags
      //      * to trigger a re-fetch:
      //      * dispatch(api.util.invalidateTags(['Post']))
      //      */
      //   }
      // },
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
