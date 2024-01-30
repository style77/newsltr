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

type ExtraData = {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
};

type Result = {
  id: string;
  subject: string;
  name: string;
  content: string;
  extra_data: ExtraData;
  last_sent_at: string;
};

type TemplatesType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

const templateApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    retrieveTemplates: build.query<TemplatesType, string>({
      query: (campaignId) => `email-templates/${campaignId}/`,
    }),
    createTemplate: build.mutation({
      query: ({ campaignId, name, subject, content }) => ({
        url: `email-templates/${campaignId}/templates/`,
        method: "POST",
        body: { campaignId, name, subject, content, extra_data: {} },
      }),
    }),
    retrieveTemplate: build.query({
      query: ({ campaignId, templateId }) =>
        `email-templates/${campaignId}/templates/${templateId}/`,
    }),
    updateTemplate: build.mutation({
      query: ({ campaignId, name, templateId, subject, content }) => ({
        url: `email-templates/${campaignId}/templates/${templateId}/`,
        method: "PUT",
        body: {
          campaignId,
          name,
          templateId,
          subject,
          content,
          extra_data: {},
        },
      }),
    }),
    partialUpdateTemplate: build.mutation({
      query: ({ campaignId, name, templateId, subject, content }) => ({
        url: `email-templates/${campaignId}/templates/${templateId}/`,
        method: "PATCH",
        body: {
          campaignId,
          name,
          templateId,
          subject,
          content,
          extra_data: {},
        },
      }),
    }),
    deleteTemplate: build.mutation({
      query: ({ campaignId, templateId, subject, content }) => ({
        url: `email-templates/${campaignId}/templates/${templateId}/`,
        method: "DELETE",
        body: { campaignId, templateId, subject, content },
      }),
    }),
  }),
});

export const {
  useRetrieveTemplateQuery,
  useRetrieveTemplatesQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  usePartialUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templateApiSlice;
