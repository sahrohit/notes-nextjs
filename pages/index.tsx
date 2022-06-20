import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
import Options from "@components/Options";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import TodoItem from "@components/TodoItem";
import { Todo, useTodosLazyQuery } from "@generated/graphql";
import { useIdentifier } from "@utils/localStorage";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
	const { identifier } = useIdentifier();

	const [getTodos, { data, loading, error }] = useTodosLazyQuery({
		variables: {
			identifier: identifier as string,
		},
		fetchPolicy: "network-only",
	});

	useEffect(() => {
		getTodos();
	});

	if (loading && !data) {
		return <FullPageLoadingSpinner />;
	}

	if (!loading && error) {
		return <h1>{JSON.stringify(error)}</h1>;
	}

	return (
		<>
			<Text textAlign="center" fontSize={"4xl"} m={8} fontWeight={"semibold"}>
				Todos
			</Text>
			<VStack mx={{ base: 8, md: "20%", lg: "30%" }}>
				<Options />
				{data?.todos
					.filter((todo) => !todo.completed)
					?.map((todo: Todo) => (
						<TodoItem
							key={todo.id}
							id={todo.id}
							body={todo.body}
							title={todo.title}
							completed={todo.completed}
							createdAt={todo.createdAt}
						/>
					))}

				{data?.todos?.filter((todo) => todo.completed) && (
					<Flex align="center" w={"full"}>
						<Divider />
						<Text padding="2" colorScheme={"gray"}>
							Completed
						</Text>
						<Divider />
					</Flex>
				)}

				{data?.todos
					.filter((todo) => todo.completed)
					?.map((todo: Todo) => (
						<TodoItem
							key={todo.id}
							id={todo.id}
							body={todo.body}
							title={todo.title}
							completed={todo.completed}
							createdAt={todo.createdAt}
						/>
					))}
			</VStack>
		</>
	);
};

export default Home;
