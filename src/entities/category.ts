import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')

export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt: Date
}
