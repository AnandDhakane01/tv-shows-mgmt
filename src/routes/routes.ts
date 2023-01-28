import express from "express";
import { login } from "../controllers/auth.js";
import {
  getAllShows,
  updateAShow,
  deleteAShow,
  addAShow,
} from "../controllers/shows.js";
import loginRequired from "../utils/loginRequired.js";

const router = express.Router();

// auth routes
router.post("/login", login);

// CRUD routes for shows
router.get("/my_shows", loginRequired, getAllShows);

router.post("/add_show", loginRequired, addAShow);

router.put("/update_show", loginRequired, updateAShow);

router.delete("/delete_show", loginRequired, deleteAShow);

router.get("/", (req, res) =>
  res.status(200).json({ message: "TV shows management system!" })
);
export default router;
