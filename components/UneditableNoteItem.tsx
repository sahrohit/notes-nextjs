import {
	Badge,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";

interface UneditableNoteItemProps {
	id: number;
	title: string;
	body: string;
	completed: boolean;
	createdAt?: string;
	updatedAt: string;
	editable?: boolean;
}

const UneditableNoteItem = ({
	title,
	body,
	updatedAt,
}: UneditableNoteItemProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<HStack
				shadow={"lg"}
				borderRadius="lg"
				border="1px solid white"
				m={2}
				p={4}
				bg="white"
				w={"full"}
				onClick={onOpen}
			>
				<VStack w={"full"} align="left">
					<Text fontSize="xl">{title}</Text>
					<Text fontSize="md">{body}</Text>

					<VStack w={"full"} alignItems={"flex-start"}>
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
						<Text w={"full"} align={"right"} fontSize={"sm"}>
							{dayjs(parseInt(updatedAt)).format("MMMM DD, YYYY h:mm A")}
						</Text>
					</VStack>
				</VStack>
			</HStack>

			<Modal onClose={onClose} size={"md"} isOpen={isOpen} preserveScrollBarGap>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text>{title}</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>{body}</Text>
					</ModalBody>
					<ModalFooter>
						<Text>
							{dayjs(parseInt(updatedAt)).format("MMMM DD, YYYY h:mm A")}
						</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UneditableNoteItem;
