import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "../src/entities/Todo";
import { User } from "../src/entities/User";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sql",
  entities: [User, Todo],
  synchronize: true,
});

export default AppDataSource;
