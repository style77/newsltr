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

export type LoginError = {
  status: number;
  data: {
    detail: string;
    code: string;
  };
};

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password cannot be blank, please enter your password"),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email(),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const resetPasswordConfirmSchema = z.object({
  new_password: z.string(),
  re_new_password: z.string(),
});

export type ResetPasswordConfirmSchemaType = z.infer<
  typeof resetPasswordConfirmSchema
>;

export interface ParamsType {
  uid: string;
  token: string;
}

export interface Prices {
  price_id: string;
  unit_amount: number;
  currency: string;
  interval: "year" | "month";
}

export interface Feature {
  name: string;
}

export interface Subscription {
  product_id: string;
  features: Feature[];
  prices: Prices[];
  currency: string;
  name: string;
  description: string;
}
