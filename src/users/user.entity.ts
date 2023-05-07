import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "users"}) // name of the table in the database 
export class User {
    @PrimaryGeneratedColumn() // transforms into a column in the database
    id: number // typescript type

    @Column({unique: true}) 
    username: string
    
    @Column()
    password: string
    
    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date
    
    @Column({nullable: true})
    authStrategy: string
}