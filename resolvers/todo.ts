import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import AppDataSource from "../config/data-source";
import { generateIdentifier } from "../utils/generateIdentifier";
import { Todo } from "../entities/Todo";

@Resolver(Todo)
export class TodoResolver {
	@Query(() => [Todo])
	alltodos(): Promise<Todo[]> {
		return Todo.find();
	}

	@Query(() => [Todo])
	todos(@Arg("identifier") identifier: string): Promise<Todo[]> {
		return Todo.find({ where: { identifier } });
	}

	@Mutation(() => Todo)
	createTodo(
		@Arg("identifier", { nullable: true })
		identifier: string = generateIdentifier(6),
		@Arg("title") title: string,
		@Arg("body") body: string
	): Promise<Todo> {
		return Todo.create({ identifier, title, body }).save();
	}

	@Mutation(() => Todo)
	async updateTodo(
		@Arg("id", () => Int) id: number,
		@Arg("identifier") identifier: string,
		@Arg("title", { nullable: true }) title: string,
		@Arg("body", { nullable: true }) body: string,
		@Arg("completed", () => Boolean, { nullable: true }) completed: boolean
	): Promise<Todo> {
		await AppDataSource.createQueryBuilder()
			.update(Todo)
			.set({ identifier, title, body, completed })
			.where("id = :id and identifier = :identifier", {
				id,
				identifier,
			})
			.execute();
		return Todo.findOneOrFail({ where: { id } });
	}

	@Mutation(() => Todo)
	async deleteTodo(@Arg("id") id: number): Promise<boolean> {
		await Todo.delete(id);
		return true;
	}
}
