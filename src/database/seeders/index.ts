// src/db/seeds/index.ts
import colors from "colors";
import { logger } from "../../shared/utils/logger";
import seedAdmin from "./seedAdmin";
import seedAttorney from "./seedAttorney";
import seedPracticeArea from "./seedPracticeArea";

const runSeeders = async () => {
  try {
    logger.info(colors.cyan("🌱 Starting database seeding..."));

    // Seed admin user
    await seedAdmin();

    // Seed practice areas
    await seedPracticeArea();

    // Seed attorney
    await seedAttorney();

    logger.info(colors.green("✔ Database seeding completed successfully!"));
  } catch (error) {
    logger.error(colors.red("❌ Error during database seeding:"), error);
    process.exit(1);
  }
};

export default runSeeders;
