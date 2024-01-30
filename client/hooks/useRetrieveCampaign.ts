import { useRetriveWorkspaceQuery } from "@/redux/features/workspaceApiSlice";
import { useParams } from "next/navigation";

export const useRetrieveCampaign = () => {
  const { workspace } = useParams();
  console.log(workspace);
  const { data, isLoading } = useRetriveWorkspaceQuery({ id: workspace });

  const campaign = data?.campaign;

  return { campaign, isLoading };
};
