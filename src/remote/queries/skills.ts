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

export const SkillSchema = z
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

export type Skill = z.infer<typeof SkillSchema>;

export const DEFAULT_SKILL: Skill = {
  id: 0,
  created_at: "",
  name: "",
  description: "",
};

export const skill_keys: Record<string, QueryKey> = {
  all: ["skills"],
};

export const useSkillsQuery: QueryFunction<Skill[]> = (select) => {
  return useQuery({
    queryKey: skill_keys.all,
    queryFn: async () => {
      const res = (await sb.from("skills").select()) as {
        data: Skill[];
      } | null;

      return res?.data || [];
    },
    select,
  });
};

export const useMutateSkill = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (skill: Skill) => {
      console.log(2);
      let res;

      if (!!skill.id)
        res = await sb
          .from("skills")
          .update({
            created_at: skill.created_at,
            name: skill.name,
            description: skill.description,
          })
          .eq("id", skill.id);
      else
        res = await sb.from("skills").insert({
          created_at: skill.created_at,
          name: skill.name,
          description: skill.description,
        });

      if (!!res.error) return res.error;
    },
    onSuccess: () => {
      toast.success("Skill updated successfully");
      client.invalidateQueries({
        queryKey: skill_keys.all,
      });
    },
    onError: (error) => {
      toast.error(`Error updating skill: ${error.message}`);
    },
  });
};
