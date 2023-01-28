import { Request, Response } from "express";
import { Shows } from "../entities/shows.js";
import _ from "lodash";
import AppDataSource from "../app.js";

const getAllShows = async (req: Request, res: Response) => {
  const user_id: number = req.user?.id;

  let all_shows: Shows[];

  try {
    all_shows = await AppDataSource.getRepository(Shows)
      .createQueryBuilder("show")
      .where("show.userid = :user_id", { user_id: user_id })
      .getMany();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: true });
  }
  return res.status(200).json(all_shows);
};

const addAShow = async (req: Request, res: Response) => {
  const { title, streaming_app, rating, review } = req.body;
  const userid = req.user.id;

  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Shows)
      .values({
        title,
        streaming_app,
        rating,
        review,
        userid,
      })
      .execute();
    return res.status(201).json({ message: "Show successfully inserted!" });
  } catch (err) {
    res.status(400).json({ error: true });
  }
};

const updateAShow = async (req: Request, res: Response) => {
  const { show_id } = req.body;
  let data = { ...req.body };

  data = _.omit(data, "show_id");

  try {
    await AppDataSource.createQueryBuilder()
      .update(Shows)
      .set({
        ...data,
      })
      .where("id = :id", { id: show_id })
      .execute();
    return res.status(201).json({ message: "Show successfully updated!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: true });
  }
};

const deleteAShow = async (req: Request, res: Response) => {
  const { show_id } = req.body;
  if (show_id) {
    try {
      await AppDataSource.createQueryBuilder()
        .delete()
        .from(Shows)
        .where("id = :id", { id: show_id })
        .execute();
      return res.status(201).json({ message: "Show successfully deleted!" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: true });
    }
  }
  return res.json({ error: true, message: "please provide the show_id" });
};

export { getAllShows, addAShow, updateAShow, deleteAShow };
