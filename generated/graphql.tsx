import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Todo;
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  body: Scalars['String'];
  identifier?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateTodoArgs = {
  body?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  identifier: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  alltodos: Array<Todo>;
  hello: Scalars['String'];
  todos: Array<Todo>;
};


export type QueryTodosArgs = {
  identifier: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  body: Scalars['String'];
  completed: Scalars['Boolean'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  identifier: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['Int'];
  identifier: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  body?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: number, title: string, identifier: string, completed: boolean } };

export type TodosQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type TodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: number, body: string, title: string, identifier: string, completed: boolean, createdAt: string, updatedAt: string }> };


export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: Int!, $identifier: String!, $title: String, $body: String, $completed: Boolean) {
  updateTodo(
    id: $id
    identifier: $identifier
    title: $title
    body: $body
    completed: $completed
  ) {
    id
    title
    identifier
    completed
    identifier
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      identifier: // value for 'identifier'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const TodosDocument = gql`
    query Todos($identifier: String!) {
  todos(identifier: $identifier) {
    id
    body
    title
    identifier
    completed
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useTodosQuery(baseOptions: Apollo.QueryHookOptions<TodosQuery, TodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
      }
export function useTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument, options);
        }
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosQueryResult = Apollo.QueryResult<TodosQuery, TodosQueryVariables>;