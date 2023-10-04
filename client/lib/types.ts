import { z } from "zod";

export const formSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
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
    email?: string;
    password?: string[];
  };
};
