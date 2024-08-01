import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categories } from "./category";

// Category_ID (Foreign Key)
// Warranty_Period

@Entity('products')
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type : 'varchar', nullable: false})
    productName: string

    @Column({type :'text', nullable: true})
    description: string

    @Column({ type: 'double precision', nullable: false})
    price: number

    @Column({ type : 'double precision', nullable: false})
    weight:number

    @Column({ type : 'varchar', nullable :true})
    colour: string

    @Column({ type : 'varchar', nullable: true})
    image: string

    @Column({type: 'varchar', nullable : false})
    material: string

    @Column({ type :'varchar', nullable: true})
    dimentions: string

    @Column({ type: 'varchar', nullable : false})
    manufacturer: string

    @Column({type: 'double precision', nullable: false})
    avgRatings: number

    @Column({default : new Date(), type : 'date'})
    releasedAt: Date

    // @ManyToOne(()=>Categories,(categories)=>categories.id)
    // @JoinColumn({name:'categoryId'})
    // categoryId:Categories

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn({type :'varchar', nullable: false})
    updatedAt: Date
}