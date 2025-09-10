"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pricingData = void 0;
const uuid_1 = require("uuid");
const pricing_types_1 = require("../utils/types/pricing-types");
const pricing_types_2 = require("../utils/types/pricing-types");
exports.pricingData = [
    {
        id: (0, uuid_1.v4)(),
        name: pricing_types_1.PricingName.FREE,
        billed: pricing_types_2.Billed.MONTHLY,
        price: 0,
    },
    {
        id: (0, uuid_1.v4)(),
        name: pricing_types_1.PricingName.STARTER,
        billed: pricing_types_2.Billed.MONTHLY,
        price: 100,
    },
    {
        id: (0, uuid_1.v4)(),
        name: pricing_types_1.PricingName.PRO,
        billed: pricing_types_2.Billed.MONTHLY,
        price: 200,
    },
    {
        id: (0, uuid_1.v4)(),
        name: pricing_types_1.PricingName.STAR,
        billed: pricing_types_2.Billed.MONTHLY,
        price: 300,
    },
];
//# sourceMappingURL=pricing-data.js.map