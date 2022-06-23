import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "@entities/Note";

const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: true,
	entities: [Note],
	migrations: ["./migrations/*.ts"],
	migrationsTableName: "migrations",
	subscribers: [],
});

export default AppDataSource;
