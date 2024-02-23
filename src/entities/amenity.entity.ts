import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
    name: string;
}
