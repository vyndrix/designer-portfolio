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

export const UserSchema = z
  .object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().nonempty({ message: "Email is required" }),
    password: z.string().optional(),
  })
  .refine((d) => !(!d.id && !d.password), {
    message: "Password is required for new users",
    path: ["password"],
  });

export type User = z.infer<typeof UserSchema>;

export const DEFAULT_USER: User = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
};

export const user_keys: Record<string, QueryKey> = {
  all: ["users"],
};

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
 * TODO: I suspect supabase trigger is not working well, maybe the problem is with updateUser.
 *       Investigate later.
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

      let res;

      if (!!user.id)
        res = await sb
          .from("profiles")
          .update({
            first_name: user.first_name,
            last_name: user.last_name,
          })
          .eq("id", user.id);
      else
        res = await sb.auth.signUp({
          email: user.email,
          password: "temporary-password",
          options: {
            data: {
              first_name: user.first_name,
              last_name: user.last_name,
            },
          },
        });

      if (!!res.error) return res.error;
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
