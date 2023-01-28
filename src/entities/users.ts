import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  OneToMany,
} from "typeorm";
import { Shows } from "./shows.js";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email!: string;

  @OneToMany((type) => Shows, (show) => show.userid)
  shows: Relation<Shows>[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
