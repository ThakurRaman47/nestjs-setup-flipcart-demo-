import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')

export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type : 'varchar', nullable: false})
    name: string

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt: Date
}
