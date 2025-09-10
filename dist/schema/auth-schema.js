"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignInSchema = exports.userSignUpSchema = void 0;
const zod_1 = require("zod");
const pricing_types_1 = require("../utils/types/pricing-types");
// import { Billed, PricingName } from "../generated/prisma";
const passwordSchema = zod_1.z
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
const phoneNumSchema = zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Enter a valid phone number with country code (e.g., +1234567890)",
});
exports.userSignUpSchema = zod_1.z.object({
    pricingName: zod_1.z
        .enum(pricing_types_1.PricingName)
        .refine((val) => Object.values(pricing_types_1.PricingName).includes(val), {
        message: "Pricing Name is required and must be valid",
    }),
    billed: zod_1.z.enum(pricing_types_1.Billed).refine((val) => Object.values(pricing_types_1.Billed).includes(val), {
        message: "Billed Type is required and must be valid",
    }),
    platform: zod_1.z.string().min(1, {
        message: "Platform is required",
    }),
    username: zod_1.z.string().min(1, {
        message: "Username is required",
    }),
    email: zod_1.z.string().email({
        message: "Invalid email address",
    }),
    password: passwordSchema,
    contactWhatsappNumber: phoneNumSchema.optional(),
    contactPhoneNumber: phoneNumSchema.optional(),
    contactLiveChat: zod_1.z.string().optional(),
    contactEmail: zod_1.z.string().optional(),
});
exports.userSignInSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Invalid email address",
    }),
    password: passwordSchema,
});
//# sourceMappingURL=auth-schema.js.map