import {
	Button,
	Divider,
	FormControl,
	HStack,
	Input,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { useCreateNoteMutation } from "@generated/graphql";
import { useIdentifier } from "@utils/localStorage";
import { Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";
import ResizeTextarea from "react-textarea-autosize";

const CreatePost = () => {
	const { identifier } = useIdentifier();
	const [expanded, setExpanded] = useState(false);
	const [createNote] = useCreateNoteMutation();

	return (
		<HStack w={"full"} justifyContent={"center"}>
			<Formik
				initialValues={{
					title: "",
					body: "",
				}}
				onSubmit={async (values, actions) => {
					const { errors } = await createNote({
						variables: {
							identifier: identifier as string,
							...values,
						},
						update: (cache) => {
							cache.evict({ fieldName: "notes" });
						},
					});

					if (!errors) {
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
							border="1px solid white"
							m={2}
							p={4}
							bg="white"
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
											placeholder="Title"
											size="xl"
											border="none"
											focusBorderColor="none"
											outline="none"
										/>
									</FormControl>
								)}
							</Field>
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
											placeholder="Body"
											size="xl"
											border="none"
											focusBorderColor="none"
											outline="none"
											rows={expanded ? 3 : 1}
											resize="none"
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
								<HStack w={"full"} justifyContent={"flex-end"}>
									<Button
										type="submit"
										size="sm"
										isLoading={props.isSubmitting}
									>
										Save
									</Button>
								</HStack>
							)}
						</VStack>
					</Form>
				)}
			</Formik>
		</HStack>
	);
};

export default CreatePost;
