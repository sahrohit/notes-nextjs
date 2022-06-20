import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "@resolvers/hello";
import AppDataSource from "@config/data-source";
import { TodoResolver } from "@resolvers/todo";

AppDataSource.initialize()
	.then(() => {
		AppDataSource.runMigrations();
	})
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	.catch((error: any) => console.log(error));

const server = new ApolloServer({
	schema: await buildSchema({
		resolvers: [HelloResolver, TodoResolver],
		validate: false,
	}),
});

export const config = {
	api: {
		bodyParser: false,
	},
};

const startServer = server.start();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await startServer;
	await server.createHandler({ path: "/api/graphql" })(req, res);
}
