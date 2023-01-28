import AppDataSource from "../app.js";
import { Users } from "../entities/users.js";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface UserObj {
  id: number;
  username: string;
  password?: string;
  email: string;
}

const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  try {
    // find user by userName
    const user = await AppDataSource.getRepository(Users)
      .createQueryBuilder("user")
      .select(["user.id", "user.username", "user.password", "user.email"])
      .where("user.username = :userName", { userName: userName })
      .getOne();

    console.log(userName, password);
    console.log(user);

    if (user === null) {
      res.status(401).json({ error: true, message: "Invalid Credentials" });
    } else {
      if (password == user.password) {
        const usr = _.omit(user, "password");
        // create a jwt token
        const accessToken = jwt.sign(JSON.stringify(user), process.env.SECRET);

        return res.status(200).send({
          message: "loggedIn",
          accessToken: accessToken,
          usr,
        });
      } else {
        res.status(400).send("Invalid Credentials!");
      }
    }
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ message: `there was an error: ${err.message}` });
  }
};

export { login };
