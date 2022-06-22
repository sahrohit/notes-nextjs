import { DeleteIcon } from "@chakra-ui/icons";
import {
	Badge,
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
	Text,
	Textarea,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import {
	useDeleteNoteMutation,
	useUpdateNoteMutation,
} from "@generated/graphql";
import { useIdentifier } from "@utils/localStorage";
import dayjs from "dayjs";
import { Field, FieldProps, Form, Formik } from "formik";

interface NoteItemProps {
	id: number;
	title: string;
	body: string;
	completed: boolean;
	createdAt?: string;
	updatedAt: string;
}

const NoteItem = ({ id, title, body, completed, updatedAt }: NoteItemProps) => {
	const { identifier } = useIdentifier();
	const toast = useToast();
	const [updateNoteMutation] = useUpdateNoteMutation();
	const [deleteNoteMutation] = useDeleteNoteMutation();

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

			<Formik
				initialValues={{
					title: title,
					body: body,
					completed: completed,
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
					>
						<ModalOverlay />
						<Form>
							<ModalContent>
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
												/>
											</FormControl>
										)}
									</Field>
								</ModalBody>
								<ModalFooter>
									<HStack w={"full"} justify={"space-between"}>
										<HStack>
											<IconButton
												colorScheme={"red"}
												variant="ghost"
												icon={<DeleteIcon />}
												aria-label="Delete"
												onClick={() => {
													deleteNoteMutation({
														variables: {
															id,
														},
													});
													toast({
														title: `Deleted Note`,
														status: "success",
														isClosable: true,
													});
												}}
											/>
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
