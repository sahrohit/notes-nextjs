import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import CreatePost from "@components/CreatePost";
import NoteItem from "@components/NoteItem";
import Options from "@components/Options";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { Note, useNotesLazyQuery } from "@generated/graphql";
import { useLocalStorage } from "@utils/useLocalStorage";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
	const [identifier] = useLocalStorage({
		key: "identifier",
		defaultValue: "",
	});

	const [getNotes, { data, loading, error }] = useNotesLazyQuery({
		variables: {
			identifier: identifier as string,
		},
		fetchPolicy: "network-only",
	});

	useEffect(() => {
		getNotes();
	}, []);

	if (loading && !data) {
		return <FullPageLoadingSpinner />;
	}

	if (!loading && error) {
		if (
			error.message.includes("DataSource is not set for this entity.") &&
			identifier
		) {
			getNotes();
		}
		return <h1>{JSON.stringify(error)}</h1>;
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
				<Options />

				<CreatePost />

				{data && data.notes.length > 0 ? (
					<SimpleGrid columns={[1, 1, 2, 2, 3, 4]} spacing={6} m={2}>
						{data?.notes
							.sort((a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt))
							?.map((note: Note) => (
								<NoteItem
									key={note.id}
									id={note.id}
									body={note.body}
									title={note.title}
									createdAt={note.createdAt}
									updatedAt={note.updatedAt}
								/>
							))}
					</SimpleGrid>
				) : (
					<Text>Note not found</Text>
				)}
			</Box>
		</>
	);
};

export default Home;
