import { v4 as uuidv4 } from "uuid";
import { PricingName, } from "../utils/types/pricing-types.js";
import { Billed } from "../utils/types/pricing-types.js";
export const pricingData = [
    {
        id: uuidv4(),
        name: PricingName.FREE,
        billed: Billed.MONTHLY,
        price: 0,
    },
    {
        id: uuidv4(),
        name: PricingName.STARTER,
        billed: Billed.MONTHLY,
        price: 100,
    },
    {
        id: uuidv4(),
        name: PricingName.PRO,
        billed: Billed.MONTHLY,
        price: 200,
    },
    {
        id: uuidv4(),
        name: PricingName.STAR,
        billed: Billed.MONTHLY,
        price: 300,
    },
];
//# sourceMappingURL=pricing-data.js.map