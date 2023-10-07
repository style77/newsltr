import { z } from "zod";

export const formSchema = z
  .object({
    first_name: z.string().min(2, "Must be 2 or more characters long"),
    last_name: z.string().min(2, "Must be 2 or more characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    re_password: z.string(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords must match",
    path: ["re_password"],
  });

export type RegisterFormSchemaType = z.infer<typeof formSchema>;

export type RegisterError = {
  status: number;
  data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string[];
    re_password: string;
  };
};
