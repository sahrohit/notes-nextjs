import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import CreatePost from "@components/CreatePost";
import Options from "@components/Options";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import UneditableNoteItem from "@components/UneditableNoteItem";
import { Note, useNotesLazyQuery } from "@generated/graphql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SharedPage = () => {
	const router = useRouter();

	const { identifier } = router.query;

	const [getNotes, { data, loading, error }] = useNotesLazyQuery({
		variables: {
			identifier: identifier as string,
		},
		fetchPolicy: "network-only",
	});

	useEffect(() => {
		getNotes();
	}, []);

	if (!identifier) {
		return <FullPageLoadingSpinner />;
	}

	if (loading && !data) {
		return <FullPageLoadingSpinner />;
	}

	if (!loading && error) {
		if (error.message.includes("DataSource is not set for this entity.")) {
			console.log("Error avoided !");
			getNotes();
		}
	}

	return (
		<>
			<Text
				textAlign="center"
				fontSize={"7xl"}
				mt={4}
				fontFamily={"Rubik Moonrocks"}
			>
				Notes
			</Text>
			<Box mx={{ base: 8, md: 8, lg: 8 }}>
				{/* <Options /> */}

				<SimpleGrid
					columns={[1, 1, 2, 2, 3, 4]}
					spacing={6}
					gridAutoFlow="row dense"
				>
					{data?.notes
						.sort((a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt))
						?.map((note: Note) => (
							<UneditableNoteItem
								key={note.id}
								id={note.id}
								body={note.body}
								title={note.title}
								completed={note.completed}
								createdAt={note.createdAt}
								updatedAt={note.updatedAt}
							/>
						))}
				</SimpleGrid>
			</Box>
		</>
	);
};

export default SharedPage;
