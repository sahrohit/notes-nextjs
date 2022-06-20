import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "@entities/Todo";

const AppDataSource = new DataSource({
	type: "sqlite",
	database: "database.sql",
	entities: [Todo],
	synchronize: true,
});

export default AppDataSource;
