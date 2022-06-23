/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useColorModeValue,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import {
	useDeleteNoteMutation,
	useUpdateNoteMutation,
} from "@generated/graphql";
import { useLocalStorage } from "@utils/useLocalStorage";
import { Field, FieldProps, Form, Formik } from "formik";
import { useRef } from "react";
import ResizeTextarea from "react-textarea-autosize";
import ListBox from "./ListBox";
import RiskyAction from "./shared/RiskyAction";

interface NoteItemProps {
	id: number;
	title: string;
	body: string;
	createdAt?: string;
	updatedAt: string;
}

const NoteItem = ({ id, title, body, updatedAt }: NoteItemProps) => {
	const [identifier] = useLocalStorage({
		key: "identifier",
	});

	const childRef: any = useRef();

	const toast = useToast();
	const [updateNoteMutation] = useUpdateNoteMutation();
	const [deleteNoteMutation] = useDeleteNoteMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<ListBox
				body={body}
				onOpen={onOpen}
				title={title}
				updatedAt={updatedAt}
			/>

			<Formik
				initialValues={{
					title: title,
					body: body,
				}}
				onSubmit={(values, actions) => {
					updateNoteMutation({
						variables: {
							identifier: identifier as string,
							id: id,
							...values,
						},
						update: (cache) => {
							cache.evict({ fieldName: "notes" });
						},
					});

					actions.setSubmitting(false);
				}}
			>
				{(props) => (
					<Modal
						preserveScrollBarGap
						onClose={() => {
							if (props.dirty) {
								props.submitForm();
							}
							onClose();
						}}
						size={"md"}
						isOpen={isOpen}
						scrollBehavior={"outside"}
					>
						<ModalOverlay />
						<Form>
							<ModalContent bg={useColorModeValue("white", "black")}>
								<ModalHeader>
									<Field name="title">
										{({ field, form }: FieldProps) => (
											<FormControl
												isInvalid={!!(form.errors.title && form.touched.title)}
											>
												<Input
													{...field}
													id="title"
													placeholder="Title"
													size="xl"
													border="none"
													focusBorderColor="none"
													outline="none"
												/>
											</FormControl>
										)}
									</Field>
								</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Field name="body">
										{({ field, form }: FieldProps) => (
											<FormControl
												isInvalid={!!(form.errors.title && form.touched.title)}
											>
												<Textarea
													{...field}
													id="body"
													placeholder="Body"
													size="xl"
													border="none"
													focusBorderColor="none"
													outline="none"
													resize="none"
													as={ResizeTextarea}
												/>
											</FormControl>
										)}
									</Field>
								</ModalBody>
								<ModalFooter>
									<HStack w={"full"} justify={"space-between"}>
										<HStack>
											<RiskyAction
												ref={childRef}
												title={`Are you sure you want to delete the note ${title}?`}
												body={`This action cannot be undone`}
												onConfirm={() => {
													deleteNoteMutation({
														variables: {
															id,
														},
														update: (cache) => {
															cache.evict({ fieldName: "notes" });
														},
													});
													toast({
														title: `Deleted Note`,
														status: "success",
														isClosable: true,
													});
												}}
											>
												<IconButton
													colorScheme={"red"}
													variant="ghost"
													icon={<DeleteIcon />}
													aria-label="Delete"
													onClick={() => childRef.current.openModal()}
												/>
											</RiskyAction>
										</HStack>
										<Button
											type="submit"
											disabled={!props.dirty}
											isLoading={props.isSubmitting}
											onClick={onClose}
										>
											Save
										</Button>
									</HStack>
								</ModalFooter>
							</ModalContent>
						</Form>
					</Modal>
				)}
			</Formik>
		</>
	);
};

// NoteItemProps.

export default NoteItem;
