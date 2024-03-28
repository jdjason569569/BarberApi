import { Customer } from 'src/customers/entities/customers.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  completed: boolean;

  @Column()
  date_register: Date;

  @Exclude()
  date_register_string: string;

  @Exclude()
  listTurns: Turn[];

  @Column()
  order: number;

  @Column()
  price: number;

  @Column()
  disable: boolean;

  @Column({ default: false })
  isSchedule: boolean;


  @OneToOne(() => Customer)
  @JoinColumn({name: 'id_customer'})
  customer: Customer;
}
