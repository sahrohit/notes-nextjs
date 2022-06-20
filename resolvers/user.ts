import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
	@Query(() => [User])
	users(): Promise<User[]> {
		return User.find();
	}

	@Mutation(() => User)
	register(
		@Arg("email") email: string,
		@Arg("username") username: string,
		@Arg("password") password: string
	): Promise<User> {
		return User.create({ email, username, password }).save();
	}
}
