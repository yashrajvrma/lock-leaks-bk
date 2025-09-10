"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pricing_data_1 = require("../data/pricing-data");
const db_config_1 = __importDefault(require("./db-config"));
async function main() {
    // seeding pricing data
    for (const data of pricing_data_1.pricingData) {
        await db_config_1.default.pricing.upsert({
            where: {
                id: data.id,
            },
            update: {},
            create: {
                id: data.id,
                name: data.name,
                price: data.price,
                billed: data.billed,
            },
        });
    }
    console.log("Pricing Data seeded successfully");
}
main()
    .catch((error) => {
    console.error("Error during seeding", error);
    process.exit();
})
    .finally(async () => {
    await db_config_1.default.$disconnect();
});
//# sourceMappingURL=seed.js.map