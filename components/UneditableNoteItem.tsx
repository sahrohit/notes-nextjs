import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react";
import dayjs from "dayjs";
import ListBox from "./ListBox";

interface UneditableNoteItemProps {
	id: number;
	title: string;
	body: string;
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
			<ListBox
				body={body}
				onOpen={onOpen}
				title={title}
				updatedAt={updatedAt}
			/>

			<Modal
				onClose={onClose}
				size={"md"}
				isOpen={isOpen}
				preserveScrollBarGap
				scrollBehavior={"outside"}
			>
				<ModalOverlay />
				<ModalContent bg={useColorModeValue("white", "black")}>
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
