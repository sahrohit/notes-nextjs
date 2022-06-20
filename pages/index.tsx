import React from "react";
import type { NextPage } from "next";
import { Todo, useTodosQuery } from "@generated/graphql";
import { Heading, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
	const { data, loading, error } = useTodosQuery({
		variables: {
			identifier: "KLCOPY",
		},
		fetchPolicy: "network-only",
	});

	if (loading && !data) {
		return <h1>Loading...</h1>;
	}

	if (!loading && error) {
		return <h1>{JSON.stringify(error)}</h1>;
	}

	return (
		<>
			<h1>Todos</h1>
			{data?.todos.map((todo: Todo) => (
				<div key={todo.id}>
					<Heading>{todo.title}</Heading>
					<Text>{todo.body}</Text>
					<Text>{todo.completed ? "Completed" : "Not Completed"}</Text>
				</div>
			))}
		</>
	);
};

export default Home;
