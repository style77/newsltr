"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentEditor } from "@tiptap/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePartialUpdateTemplateMutation } from "@/redux/features/templatesApiSlice";
import { useParams } from "next/navigation";
import { useRetrieveCampaign } from "@/hooks/useRetrieveCampaign";

const formSchema = z.object({
  name: z.string(),
  subject: z.string(),
  content: z.string(),
});

interface TemplateFormType {
  action: string;
  option: {
    name: string;
    subject: string;
    content: string;
  };
}

export function EditTemplateForm({ action, option }: TemplateFormType) {
  const { editor } = useCurrentEditor();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...option,
    },
  });

  const { workspace, template: templateId } = useParams();
  // console.log(workspace, template);
  const { campaign: campaignId, isLoading: campaignLoading } =
    useRetrieveCampaign();

  const [updateTemplate, { isLoading }] = usePartialUpdateTemplateMutation();
  // const [createTemplate, { isLoading }] = useCreateTemplateMutation();

  useEffect(() => {
    const updateContent = () => {
      if (editor) {
        form.setValue("content", editor?.getHTML());
      }
    };

    editor?.on("update", updateContent);

    return () => {
      editor?.off("update", updateContent);
    };
  }, [editor, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { subject, name, content } = values;
    console.log(values);
    try {
      updateTemplate({
        campaignId,
        templateId,
        name,
        subject,
        content,
      }).unwrap();
      // createTemplate({ campaignId, name, subject, content }).unwrap();
    } catch (error) {
      console.error(error);
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="p-4 border-t border-border"
                  placeholder="Object"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Input
                  className="p-4 border-t border-border"
                  placeholder="Template Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="full" className="rounded-none">
          {action}
        </Button>
      </form>
    </Form>
  );
}
