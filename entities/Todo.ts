import { ObjectType, Field, Int } from "type-graphql";
import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	identifier!: string;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column({ type: "text" })
	body!: string;

	@Field()
	@Column({ type: "boolean", default: false })
	completed!: boolean;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt = new Date();
}
