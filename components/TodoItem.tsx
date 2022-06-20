import { Badge, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import { useUpdateTodoMutation } from "@generated/graphql";
import { useIdentifier } from "@utils/localStorage";
import dayjs from "dayjs";
import { BaseSyntheticEvent } from "react";

interface TodoItemProps {
	id: number;
	title: string;
	body: string;
	completed: boolean;
	createdAt: string;
}

const TodoItem = ({ id, title, body, completed, createdAt }: TodoItemProps) => {
	const asValue = completed ? "s" : undefined;
	const { identifier } = useIdentifier();
	const [updateTodoMutation] = useUpdateTodoMutation();

	return (
		<HStack
			shadow={"lg"}
			borderRadius="lg"
			border="1px solid white"
			m={2}
			p={4}
			bg="white"
			w={"full"}
		>
			<Checkbox
				size="lg"
				colorScheme="orange"
				defaultChecked={completed}
				mx={2}
				onChange={(e: BaseSyntheticEvent) => {
					updateTodoMutation({
						variables: {
							id,
							identifier: identifier,
							completed: e.target.checked,
						},
					});
				}}
			/>
			<VStack w={"full"} align="left">
				<Text as={asValue} fontSize="2xl">
					{title}
				</Text>
				<Text as={asValue}>{body}</Text>

				<HStack w={"full"} justifyContent={"space-between"}>
					<HStack>
						<Badge
							px={2}
							fontSize="0.8em"
							borderRadius={"lg"}
							colorScheme="green"
						>
							Hello
						</Badge>
						<Badge
							px={2}
							fontSize="0.8em"
							borderRadius={"lg"}
							colorScheme="red"
						>
							Again
						</Badge>
					</HStack>
					<Text as={asValue} w={"full"} align={"right"}>
						{dayjs(parseInt(createdAt)).format("MMMM DD, YYYY h:mm A")}
					</Text>
				</HStack>
			</VStack>
		</HStack>
	);
};

export default TodoItem;
