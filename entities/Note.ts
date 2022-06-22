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
export class Note extends BaseEntity {
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
	createdAt!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt!: Date;
}
