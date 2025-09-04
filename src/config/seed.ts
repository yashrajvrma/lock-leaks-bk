import { pricingData } from "../data/pricing-data";
import prisma from "./db-config";

async function main() {
  // seeding pricing data

  for (const data of pricingData) {
    await prisma.pricing.upsert({
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
    await prisma.$disconnect();
  });
