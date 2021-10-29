import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Counterparts{
    @PrimaryGeneratedColumn({name:"counterpart_id", type:"int"})
    id: number;
    @Column({ type:"character varying", length:10})
    name: string;
    @Column({ type:"character varying", length:10})
    code: string;

}