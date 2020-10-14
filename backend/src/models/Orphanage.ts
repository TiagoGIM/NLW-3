
import {Column,Entity , PrimaryGeneratedColumn } from 'typeorm';

@Entity('orphanages')
export default class Orphanage{
  @PrimaryGeneratedColumn('increment')
  id:number;
  @Column()
  name:string;
  @Column()
  opening_hours: string;
  @Column()
  latitude:number;
  @Column()
  longetude:number;
  @Column()  
  about:string;
  @Column()
  instructions:string;
  @Column()  
  open_weekends:boolean;
}