import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../interfaces/user.interface';

  @Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column({ type: 'varchar', length: 128, nullable: false })
      firstName!: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
      lastName!: string;

    @Column({ type: 'varchar', length: 128, unique: true, nullable: false })
      email!: string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false })
      password!: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
      phoneNumber: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
      role!: UserRole;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
      createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
      updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
      deletedAt: Date;

}
