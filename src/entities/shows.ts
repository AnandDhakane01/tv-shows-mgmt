import {
  Entity,
  Relation,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Users } from "./users.js";

@Entity()
export class Shows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  streaming_app: string;

  @Column()
  rating: number;

  @Column()
  review: string;

  @Column()
  userid: number;
  @JoinColumn()
  @ManyToOne(() => Users, (user) => user.shows, { onDelete: "CASCADE" })
  user: Relation<Users>;
}
