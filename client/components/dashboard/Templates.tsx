"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";

import {
  useDeleteTemplateMutation,
  useRetrieveTemplatesQuery,
} from "@/redux/features/templatesApiSlice";
import { useRetriveWorkspaceQuery } from "@/redux/features/workspaceApiSlice";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletionDialog from "./DeletionDialog";
import { useAppDispatch } from "@/redux/hooks";
import { openDeleteDialog } from "@/redux/features/dialogSlice";

const Templates = () => {
  // const [isOpen, setIsOpen] = useState(false);
  //
  // const onClose = () => {
  //   setIsOpen(false);
  // };

  const [deleteTemplate, { isLoading: templateDeletionLoading }] =
    useDeleteTemplateMutation();

  const dispatch = useAppDispatch();

  const openTemplateDeletionDialog = () => {
    dispatch(openDeleteDialog());
  };

  const { workspace } = useParams();
  const url = `/dashboard/workspaces/${workspace}/templates/`;
  const { data, isLoading } = useRetriveWorkspaceQuery({ id: workspace });

  const campaignId = data?.campaign;
  const { data: templates, isLoading: isTemplatesLoading } =
    useRetrieveTemplatesQuery(campaignId);

  if (isLoading) {
    return <div className="text-red-400">loading</div>;
  }

  const handleDelete = async (templateId: string) => {
    try {
      await deleteTemplate({ campaignId, templateId }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(templates);

  return (
    <>
      <ul>
        {templates?.results.map(({ id, name }) => (
          <>
            <DeletionDialog
              deleteAction={() => handleDelete(id)}
              itemToBeDeleted="template"
            />
            <li
              className="p-3 flex justify-between text-sm border-b border-border"
              key={id}
              onClick={() => console.log(id)}
            >
              <span className="self-center">{name}</span>

              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-sm hover:bg-background2">
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>My Template</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem>
                    <Link href={`${url}/${id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={openTemplateDeletionDialog}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default Templates;
