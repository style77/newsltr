import { cache } from "react";
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

const templateApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    retrieveTemplates: build.query({
      query: ({ campaignId }) => `email-templates/${campaignId}/`,
    }),
    createTemplate: build.mutation({
      query: ({ campaignId, subject, content }) => ({
        url: `email-templates/${campaignId}/templates/`,
        method: "POST",
        body: { campaignId, subject, content },
      }),
    }),
    retrieveTemplate: build.query({
      query: ({ campaignId, templateId }) =>
        `email-templates/${campaignId}/templates/${templateId}/`,
    }),
    updateTemplate: build.mutation({
      query: ({ campaignId, templateId, subject, content }) => ({
        url: `email-templates/${campaignId}/templates/${templateId}/`,
        method: "PUT",
        body: { campaignId, templateId, subject, content },
      }),
    }),
    partialUpdateTemplate: build.mutation({
      query: ({ campaignId, templateId, subject, content }) => ({
        url: `email-templates/${campaignId}/templates/${templateId}/`,
        method: "PATCH",
        body: { campaignId, templateId, subject, content },
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
