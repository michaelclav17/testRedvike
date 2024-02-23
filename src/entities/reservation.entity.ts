import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Amenity } from './amenity.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Amenity, amenity => amenity.id)
  @JoinColumn({ name: 'amenityId' })
    amenity: Amenity;

  @Column({ type: 'numeric', nullable: true })
    userId: number;

  @Column({ type: 'numeric', nullable: true })
    startTime: number;

  @Column({ type: 'numeric', nullable: true })
    endTime: number;

  @Column({ type: 'numeric', nullable: true })
    date: number;
}
