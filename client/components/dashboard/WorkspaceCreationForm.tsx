"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "../ui/textarea";
import { useCreateWorkspaceMutation } from "@/redux/features/workspaceApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { closeCreateDialog } from "@/redux/features/dialogSlice";
import Spinner from "../ui/spinner";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

type CreateWorspaceErrorType = {
  data: {
    detail: string;
  };
};

const WorkspaceCreationForm = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    dispatch(closeCreateDialog());
    try {
      const { name, description } = values;
      await createWorkspace({ name, description }).unwrap();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.data?.detail,
      });
      console.log(error);
    }
    // dispatch(closeCreateDialog());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>This is the workspace name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                This is the description of the workspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default WorkspaceCreationForm;
