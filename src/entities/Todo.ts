import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
