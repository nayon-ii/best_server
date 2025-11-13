// src/db/seeds/seedAttorney.ts
import colors from "colors";
import { logger } from "../../shared/utils/logger";
import { Attorney } from "../../features/attorneys/attorney.model";
import { USER_ROLE, STATUS } from "../../shared/enums/user";

const attorneySeedData = {
  name: "Chauntelle",
  email: "info@cwwhitelaw.com",
  phone: "713-236-7700",
  designation: "Founding Attorney",
  role: USER_ROLE.ADMIN,
  location: {
    line1: "Lyric Tower",
    line2: "440 Louisiana St., STE 900",
    line3: "Houston, TX 77002",
  },
  biography:
    "Chauntelle Wood White is the Founding Attorney of C.W. White. A seasoned first-chair trial lawyer, she has successfully tried more than 40 jury and bench trials across criminal and civil matters. Her background spans public service and elite, big-law firm practice. She is known for steady courtroom presence, her charisma, clear judgment under pressure, and practical, results-oriented problem-solving. Clients and colleagues rely on her discipline, credibility, and unwavering advocacy. Chauntelle’s work centers on Federal and State Criminal Litigation, and White-Collar Investigations, and Grand-Jury Representation. She routinely handles high-stakes cases and responds to aggressive federal and state inquiries, navigating complex, sensitive issues with discretion and rigor. Her command of federal and state regulatory frameworks equips her to lead investigations, manage pre-indictment strategy, and advise on corporate governance and compliance. Before entering private practice, Chauntelle served as a Felony Prosecutor in Houston. She is also a proud veteran of the United States Air Force Reserve, where she served for eight years.",
  profileImage: "http://localhost:3000/user.png",
  bannerImage: "http://localhost:3000/attorney.png",
  education: [
    "J.D., Southern University Law Center - cum laude - Law Review Senior Editor and Moot Court Board Member",
    "B.S., Cameron University",
  ],
  barAdmission: [
    "Texas, Louisiana, and Illinois.",
    "U.S. District Courts for the Northern, Western, and Southern Districts of Texas",
    "U.S. District Courts for the Eastern, Middle, and Western Districts of Louisiana",
  ],
  professionalMemberships: [
    "Federal Bar Association",
    "Houston Bar Association",
    "Houston Young Lawyers Association",
    "National Bar Association",
    "Texas Bar Foundation, Lifetime Fellow",
    "Innocence Project of Texas, Board Member",
    "University of Houston, Adjunct Professor",
  ],
  socialLinks: {
    facebook: "https://facebook.com/Chauntelle.white",
    twitter: "https://twitter.com/Chauntelle_white",
    linkedin: "https://linkedin.com/in/Chauntelle-wood-white",
  },
  status: STATUS.ACTIVE,
};

const seedAttorney = async () => {
  try {
    // Check if attorney already exists
    const isExistAttorney = await Attorney.findOne({
      email: attorneySeedData.email,
    });

    if (!isExistAttorney) {
      await Attorney.create(attorneySeedData);
      logger.info(
        colors.green(
          "✔ Attorney (Chauntelle Wood White) created successfully!"
        )
      );
    } else {
      logger.info(colors.yellow("Attorney already exists."));
    }
  } catch (error) {
    logger.error(colors.red("Error creating attorney:"), error);
  }
};

export default seedAttorney;
