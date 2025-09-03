import { z } from "zod";
import { Billed, PricingName } from "../utils/types/pricing-types.js";
// import { Billed, PricingName } from "../generated/prisma";
const passwordSchema = z
    .string()
    .min(8, {
    message: "Min length should be 8 char",
})
    .max(20, {
    message: "Max length should be less than 20 char",
})
    .refine((password) => /[A-Z]/.test(password), {
    message: "Atleast 1 char should be uppercase",
})
    .refine((password) => /[a-z]/.test(password), {
    message: "Atleast 1 char should be lowercase",
})
    .refine((password) => /[0-9]/.test(password), {
    message: "Atleast 1 num should be there",
})
    .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Atleast 1 special char should be there",
});
const phoneNumSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Enter a valid phone number with country code (e.g., +1234567890)",
});
export const userSignUpSchema = z.object({
    pricingName: z
        .enum(PricingName)
        .refine((val) => Object.values(PricingName).includes(val), {
        message: "Pricing Name is required and must be valid",
    }),
    billed: z.enum(Billed).refine((val) => Object.values(Billed).includes(val), {
        message: "Billed Type is required and must be valid",
    }),
    platform: z.string().min(1, {
        message: "Platform is required",
    }),
    username: z.string().min(1, {
        message: "Username is required",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: passwordSchema,
    contactWhatsappNumber: phoneNumSchema.optional(),
    contactPhoneNumber: phoneNumSchema.optional(),
    contactLiveChat: z.string().optional(),
    contactEmail: z.string().optional(),
});
export const userSignInSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: passwordSchema,
});
//# sourceMappingURL=auth-schema.js.map