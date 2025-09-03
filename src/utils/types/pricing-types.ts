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

export type PricingSeedDataProps = {
  id: string;
  name: PricingName;
  billed: Billed;
  price: number;
};
