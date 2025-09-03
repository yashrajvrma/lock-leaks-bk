import { z } from "zod";
import { Billed, PricingName } from "../utils/types/pricing-types.js";
export declare const userSignUpSchema: z.ZodObject<{
    pricingName: z.ZodEnum<typeof PricingName>;
    billed: z.ZodEnum<typeof Billed>;
    platform: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    contactWhatsappNumber: z.ZodOptional<z.ZodString>;
    contactPhoneNumber: z.ZodOptional<z.ZodString>;
    contactLiveChat: z.ZodOptional<z.ZodString>;
    contactEmail: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const userSignInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth-schema.d.ts.map