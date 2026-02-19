import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { sb } from "..";
import type { QueryFunction } from "../type";

export const ProjectSchema = z
  .object({
    id: z.number(),
    created_at: z.string(),
    name: z.string(),
    description: z.string(),
  })
  .transform((v) => ({
    ...v,
    created_at: new Date(v.created_at).toISOString(),
  }));

export type Project = z.infer<typeof ProjectSchema>;

export const DEFAULT_PROJECT: Project = {
  id: -1,
  created_at: "",
  name: "",
  description: "",
};

export const project_keys: Record<string, QueryKey> = {
  all: ["projects"],
};

export const useProjectsQuery: QueryFunction<Project[]> = (select) => {
  return useQuery({
    queryKey: project_keys.all,
    queryFn: async () => {
      const res = (await sb.from("projects").select()) as {
        data: Project[];
      } | null;

      return res?.data || [];
    },
    select,
  });
};

export const useMutateProject = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (project: Project) => {
      let res;

      if (!!project.id)
        res = await sb
          .from("projects")
          .update({
            created_at: project.created_at,
            name: project.name,
            description: project.description,
          })
          .eq("id", project.id);
      else
        res = await sb.from("projects").insert({
          created_at: project.created_at,
          name: project.name,
          description: project.description,
        });

      if (!!res.error) return res.error;
    },
    onSuccess: () => {
      toast.success("Project updated successfully");
      client.invalidateQueries({
        queryKey: project_keys.all,
      });
    },
    onError: (error) => {
      toast.error(`Error updating project: ${error.message}`);
    },
  });
};
