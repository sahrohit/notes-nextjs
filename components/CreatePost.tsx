/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Button,
	Divider,
	FormControl,
	HStack,
	Input,
	Textarea,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { useCreateNoteMutation } from "@generated/graphql";
import { useLocalStorage } from "@utils/useLocalStorage";
import { Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";
import ResizeTextarea from "react-textarea-autosize";

const CreatePost = () => {
	const [expanded, setExpanded] = useState(false);
	const [createNote] = useCreateNoteMutation();

	const [identifier, setIdentifier] = useLocalStorage({
		key: "identifier",
	});

	return (
		<HStack w={"full"} justifyContent={"center"}>
			<Formik
				initialValues={{
					title: "",
					body: "",
				}}
				onSubmit={async (values, actions) => {
					console.log(values);
					const { errors, data } = await createNote({
						variables:
							identifier && identifier?.length > 0
								? {
										identifier,
										...values,
							 }
								: { ...values },
						update: (cache) => {
							cache.evict({ fieldName: "notes" });
						},
					});

					if (!errors) {
						if (data?.createNote.identifier) {
							setIdentifier(data?.createNote.identifier);
						}
						actions.resetForm();
						actions.setSubmitting(false);
						setExpanded(false);
					}
				}}
			>
				{(props) => (
					<Form>
						<VStack
							shadow={"md"}
							borderRadius="lg"
							border="1px solid"
							borderColor={useColorModeValue("white", "blackAlpha.400")}
							m={2}
							p={4}
							bg={useColorModeValue("white", "blackAlpha.400")}
							w={"500px"}
						>
							<Field name="title">
								{({ field, form }: FieldProps) => (
									<FormControl
										isInvalid={!!(form.errors.title && form.touched.title)}
									>
										<Input
											{...field}
											id="title"
											placeholder={expanded ? "Title" : "Take a note"}
											size="xl"
											border="none"
											focusBorderColor="none"
											outline="none"
											onClick={() => {
												setExpanded(true);
											}}
											onFocus={() => {
												setExpanded(true);
											}}
										/>
									</FormControl>
								)}
							</Field>
							{expanded && (
								<>
									<Divider borderColor={"gray"} />
									<Field name="body">
										{({ field, form }: FieldProps) => (
											<FormControl
												isInvalid={!!(form.errors.title && form.touched.title)}
											>
												<Textarea
													{...field}
													as={ResizeTextarea}
													id="body"
													placeholder={expanded ? "Take a note" : "Bodys"}
													size="xl"
													border="none"
													focusBorderColor="none"
													outline="none"
													rows={expanded ? 3 : 1}
													resize="none"
												/>
											</FormControl>
										)}
									</Field>
									<HStack w={"full"} justifyContent={"flex-end"}>
										<Button
											type="submit"
											size="sm"
											isLoading={props.isSubmitting}
										>
											Save
										</Button>
									</HStack>
								</>
							)}
						</VStack>
					</Form>
				)}
			</Formik>
		</HStack>
	);
};

export default CreatePost;
