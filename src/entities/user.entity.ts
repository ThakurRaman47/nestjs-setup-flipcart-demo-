import { Address } from "src/common/interfaces/address.interface";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'varchar',nullable:false})
    firstName:string

    @Column({type:'varchar',nullable:false})
    lastName:string

    @Column({type:'varchar',nullable:false,unique:true})
    email:string

    @Column({type:'varchar',nullable:false})
    password:string

    @Column({type: 'jsonb', nullable: false})
    address : Address[]

    @Column({type : 'varchar', nullable:false})
    country : string

    @Column({type : 'varchar', nullable: false})
    gender : string

    @Column( {type : 'date', nullable: false})
    dob : Date

    @Column()
    profilePic: string

    @Column({ type : 'double precision'})
    lastLogin: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
}
