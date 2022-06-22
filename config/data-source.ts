import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "@entities/Note";

const AppDataSource = new DataSource({
	type: "sqlite",
	database: "database.sql",
	entities: [Note],
	synchronize: true,
});

export default AppDataSource;
