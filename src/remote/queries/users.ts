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

export const user_keys: Record<string, QueryKey> = {
  all: ["users"],
};

export const UserSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const useUsersQuery: QueryFunction<User[]> = (select) => {
  return useQuery({
    queryKey: user_keys.all,
    queryFn: async () => {
      const res = (await sb.from("profiles").select()) as {
        data: User[];
      } | null;

      return res?.data || [];
    },
    select,
  });
};

/**
 * TODO: I suspect supabase trigger is not working well, maybe the problem is with updateUser
 *       investigate later.
 */
export const useMutateUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (user: User) => {
      // const { data, error } = await sb.auth.updateUser({
      //   email: user.email,
      //   data: {
      //     first_name: user.first_name,
      //     last_name: user.last_name,
      //   },
      // });

      const { error } = await sb
        .from("profiles")
        .update({
          first_name: user.first_name,
          last_name: user.last_name,
        })
        .eq("id", user.id);

      if (!!error) throw error;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      client.invalidateQueries({
        queryKey: user_keys.all,
      });
    },
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`);
    },
  });
};
