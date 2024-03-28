import { Customer } from 'src/customers/entities/customers.entity';
import { Config } from 'src/config/entities/config.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column()
  register: Date;

  @Column()
  id_firebase: string;

  @Column()
  email: string;

  @Column()
  active_sessions: number;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers : Customer[];

  @OneToOne(() => Config, config => config.users)
  config: Config;
  

}
