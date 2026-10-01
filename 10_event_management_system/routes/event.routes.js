import express from "express";

import uploads from "../middlewares/uploads.js";
import eventControllers from "../controllers/eventControllers.js";

const router = express.Router();

router.post(
  "/create",
  uploads.fields([
    { name: "eventImages", maxCount: 5 },
    { name: "eventPoster", maxCount: 1 },
    {
      name: "eventBanners",
      maxCount: 1,
    },
    {
      name: "eventSpeakers",
      maxCount: 3,
    },
    {
      name: "eventDocuments",
      maxCount: 3,
    },
  ]),
  eventControllers.create,
);


export default router;