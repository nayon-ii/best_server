import express from "express";
import { userRoutes } from "../features/user/user.route";
import { AuthRoutes } from "../features/auth/auth.route";
import { practiceAreaRoutes } from "../features/practice_areas/practiceArea.route";
import { attorneyRoutes } from "../features/attorneys/attorney.route";
import { insightRoutes } from "../features/insights/insight.route";
import { contactRoutes } from "../features/contact/contact.route";

const router = express.Router();

const apiRoutes: Array<{ path: string; route: express.Router }> = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/practice-areas",
    route: practiceAreaRoutes,
  },
  {
    path: "/attorneys",
    route: attorneyRoutes,
  },
  {
    path: "/insights",
    route: insightRoutes,
  },
  {
    path: "/contact",
    route: contactRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
