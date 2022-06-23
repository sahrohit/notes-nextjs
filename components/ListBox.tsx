import {
	HStack,
	useColorModeValue,
	VStack,
	Badge,
	Tooltip,
	Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";

interface ListBoxProps {
	onOpen: () => void;
	title: string;
	body: string;
	updatedAt: string;
}

const ListBox = ({ onOpen, title, body, updatedAt }: ListBoxProps) => {
	return (
		<HStack
			shadow={"lg"}
			borderRadius="lg"
			border="1px solid"
			p={4}
			borderColor={useColorModeValue("white", "blackAlpha.400")}
			bg={useColorModeValue("white", "blackAlpha.400")}
			w={"full"}
			onClick={onOpen}
		>
			<VStack
				w={"full"}
				h={"100%"}
				align="left"
				justifyContent={"space-between"}
			>
				<Text fontSize="xl">{title}</Text>
				<Text fontSize="md">{body}</Text>

				<VStack w={"full"} alignItems={"flex-start"}>
					<HStack flexWrap={"wrap"}>
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
					<Tooltip label="Last Updated">
						<Text w={"full"} align={"left"} fontSize={"xs"}>
							{dayjs(parseInt(updatedAt)).format("MMMM DD, YYYY h:mm A")}
						</Text>
					</Tooltip>
				</VStack>
			</VStack>
		</HStack>
	);
};

export default ListBox;
