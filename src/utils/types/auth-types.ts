import e from "express";

export enum PricingName {
  FREE = "FREE",
  STARTER = "STARTER",
  PRO = "PRO",
  STAR = "STAR",
}

export enum Billed {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

// export type User = {
//   id: string;
//   fullName: string;
//   phoneNum: string;
//   password: string;
//   refreshToken?: string;
//   role: Role.ADMIN;
//   businessId: string;
// };
