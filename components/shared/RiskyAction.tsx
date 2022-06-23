/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
	useColorModeValue,
	HStack,
} from "@chakra-ui/react";
import { forwardRef, ReactNode, useImperativeHandle } from "react";

interface RiskyActionProps {
	title: string;
	body: string;
	children: ReactNode;
	onConfirm: () => void;
}

const RiskyAction = (
	{ title, body, children, onConfirm }: RiskyActionProps,
	ref: any
) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useImperativeHandle(ref, () => {return {openModal:() => onOpen()}});

	return (
		<>
			{children}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={useColorModeValue("white", "black")}>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{body}</ModalBody>

					<ModalFooter>
						<HStack spacing={4}>
							<Button variant="ghost" onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="red" mr={3} onClick={onConfirm}>
								Delete
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default forwardRef(RiskyAction);
