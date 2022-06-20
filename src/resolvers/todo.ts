import { Arg, Mutation, Query, Resolver } from "type-graphql";
import AppDataSource from "../../config/data-source";
import { generateIdentifier } from "../../utils/generateIdentifier";
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
    @Arg("id") id: number,
    @Arg("identifier") identifier: string,
    @Arg("title") title: string,
    @Arg("body") body: string
  ): Promise<Todo> {
    const result = await AppDataSource.createQueryBuilder()
      .update(Todo)
      .set({ identifier, title, body })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Todo)
  async deleteTodo(@Arg("id") id: number): Promise<boolean> {
    await Todo.delete(id);
    return true;
  }
}
