import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Mutation = {
	__typename?: "Mutation";
	createNote: Note;
	deleteNote: Scalars["Boolean"];
	updateNote: Note;
};

export type MutationCreateNoteArgs = {
	body: Scalars["String"];
	identifier?: InputMaybe<Scalars["String"]>;
	title: Scalars["String"];
};

export type MutationDeleteNoteArgs = {
	id: Scalars["Int"];
};

export type MutationUpdateNoteArgs = {
	body?: InputMaybe<Scalars["String"]>;
	id: Scalars["Int"];
	identifier: Scalars["String"];
	title?: InputMaybe<Scalars["String"]>;
};

export type Note = {
	__typename?: "Note";
	body: Scalars["String"];
	createdAt: Scalars["String"];
	id: Scalars["Int"];
	identifier: Scalars["String"];
	title: Scalars["String"];
	updatedAt: Scalars["String"];
};

export type Query = {
	__typename?: "Query";
	allNotes: Array<Note>;
	hello: Scalars["String"];
	notes: Array<Note>;
};

export type QueryNotesArgs = {
	identifier: Scalars["String"];
};

export type CreateNoteMutationVariables = Exact<{
	title: Scalars["String"];
	body: Scalars["String"];
	identifier?: InputMaybe<Scalars["String"]>;
}>;

export type CreateNoteMutation = {
	__typename?: "Mutation";
	createNote: {
		__typename?: "Note";
		id: number;
		identifier: string;
		title: string;
		body: string;
	};
};

export type DeleteNoteMutationVariables = Exact<{
	id: Scalars["Int"];
}>;

export type DeleteNoteMutation = {
	__typename?: "Mutation";
	deleteNote: boolean;
};

export type UpdateNoteMutationVariables = Exact<{
	id: Scalars["Int"];
	identifier: Scalars["String"];
	title?: InputMaybe<Scalars["String"]>;
	body?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateNoteMutation = {
	__typename?: "Mutation";
	updateNote: {
		__typename?: "Note";
		id: number;
		title: string;
		body: string;
		identifier: string;
	};
};

export type NotesQueryVariables = Exact<{
	identifier: Scalars["String"];
}>;

export type NotesQuery = {
	__typename?: "Query";
	notes: Array<{
		__typename?: "Note";
		id: number;
		body: string;
		title: string;
		identifier: string;
		createdAt: string;
		updatedAt: string;
	}>;
};

export const CreateNoteDocument = gql`
	mutation CreateNote($title: String!, $body: String!, $identifier: String) {
		createNote(title: $title, body: $body, identifier: $identifier) {
			id
			identifier
			title
			body
		}
	}
`;
export type CreateNoteMutationFn = Apollo.MutationFunction<
	CreateNoteMutation,
	CreateNoteMutationVariables
>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useCreateNoteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateNoteMutation,
		CreateNoteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(
		CreateNoteDocument,
		options
	);
}
export type CreateNoteMutationHookResult = ReturnType<
	typeof useCreateNoteMutation
>;
export type CreateNoteMutationResult =
	Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<
	CreateNoteMutation,
	CreateNoteMutationVariables
>;
export const DeleteNoteDocument = gql`
	mutation DeleteNote($id: Int!) {
		deleteNote(id: $id)
	}
`;
export type DeleteNoteMutationFn = Apollo.MutationFunction<
	DeleteNoteMutation,
	DeleteNoteMutationVariables
>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteNoteMutation,
		DeleteNoteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(
		DeleteNoteDocument,
		options
	);
}
export type DeleteNoteMutationHookResult = ReturnType<
	typeof useDeleteNoteMutation
>;
export type DeleteNoteMutationResult =
	Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<
	DeleteNoteMutation,
	DeleteNoteMutationVariables
>;
export const UpdateNoteDocument = gql`
	mutation UpdateNote(
		$id: Int!
		$identifier: String!
		$title: String
		$body: String
	) {
		updateNote(id: $id, identifier: $identifier, title: $title, body: $body) {
			id
			title
			body
			identifier
		}
	}
`;
export type UpdateNoteMutationFn = Apollo.MutationFunction<
	UpdateNoteMutation,
	UpdateNoteMutationVariables
>;

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      identifier: // value for 'identifier'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateNoteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateNoteMutation,
		UpdateNoteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(
		UpdateNoteDocument,
		options
	);
}
export type UpdateNoteMutationHookResult = ReturnType<
	typeof useUpdateNoteMutation
>;
export type UpdateNoteMutationResult =
	Apollo.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<
	UpdateNoteMutation,
	UpdateNoteMutationVariables
>;
export const NotesDocument = gql`
	query Notes($identifier: String!) {
		notes(identifier: $identifier) {
			id
			body
			title
			identifier
			createdAt
			updatedAt
		}
	}
`;

/**
 * __useNotesQuery__
 *
 * To run a query within a React component, call `useNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotesQuery({
 *   variables: {
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useNotesQuery(
	baseOptions: Apollo.QueryHookOptions<NotesQuery, NotesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<NotesQuery, NotesQueryVariables>(
		NotesDocument,
		options
	);
}
export function useNotesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<NotesQuery, NotesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<NotesQuery, NotesQueryVariables>(
		NotesDocument,
		options
	);
}
export type NotesQueryHookResult = ReturnType<typeof useNotesQuery>;
export type NotesLazyQueryHookResult = ReturnType<typeof useNotesLazyQuery>;
export type NotesQueryResult = Apollo.QueryResult<
	NotesQuery,
	NotesQueryVariables
>;
