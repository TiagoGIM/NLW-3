
import {Column,Entity , PrimaryGeneratedColumn, OneToMany,JoinColumn } from 'typeorm';
import { imagesHome1602782315496 } from '../database/migrations/1602782315496-images_home';
import Image from './image';

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

  //A relação entre eles é em qual parametro de image? orphanage
  @OneToMany(() => Image, image => image.orphanage, {
    //quando um orfanato for criado ou atualizado ele da um Join ou sea, atualiza as images.
    cascade :['insert','update']
  })
  @JoinColumn({name:'orphanage_id'})
  images :Image[];
}