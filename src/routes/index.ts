import express from "express";
import { userRoutes } from "../features/user/user.route";

const router = express.Router();

const apiRoutes: Array<{ path: string; route: express.Router }> = [
  {
    path: "/users",
    route: userRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
