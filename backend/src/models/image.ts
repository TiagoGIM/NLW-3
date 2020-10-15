import {Column,Entity , PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanege from './Orphanage';

@Entity('images')
export default class Image {

  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  path:string;

  //recebendo um orfanato, qual campo tem os dados relacionados: images 
  @ManyToOne(() => Orphanege,orphanage => orphanage.images)
  @JoinColumn({name:'orphanage_id'})
  orphanage: Orphanege;
}