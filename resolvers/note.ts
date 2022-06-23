import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import AppDataSource from "../config/data-source";
import { generateIdentifier } from "../utils/generateIdentifier";
import { Note } from "../entities/Note";

@Resolver(Note)
export class NoteResolver {
	@Query(() => [Note])
	allNotes(): Promise<Note[]> {
		return Note.find();
	}

	@Query(() => [Note])
	async notes(@Arg("identifier") identifier: string): Promise<Note[]> {
		return Note.find({
			where: { identifier },
		});
	}

	@Mutation(() => Note)
	createNote(
		@Arg("identifier", { nullable: true })
		identifier: string = generateIdentifier(6),
		@Arg("title") title: string,
		@Arg("body") body: string
	): Promise<Note> {
		return Note.create({ identifier, title, body }).save();
	}

	@Mutation(() => Note)
	async updateNote(
		@Arg("id", () => Int) id: number,
		@Arg("identifier") identifier: string,
		@Arg("title", { nullable: true }) title: string,
		@Arg("body", { nullable: true }) body: string
	): Promise<Note> {
		await AppDataSource.createQueryBuilder()
			.update(Note)
			.set({ identifier, title, body })
			.where("id = :id and identifier = :identifier", {
				id,
				identifier,
			})
			.execute();
		return Note.findOneOrFail({ where: { id } });
	}

	@Mutation(() => Boolean)
	async deleteNote(@Arg("id", () => Int) id: number): Promise<boolean> {
		await Note.delete(id);
		return true;
	}
}
