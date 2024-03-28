import { users } from 'src/user/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id_config: number;

  @Column()
  sessions: number;


  @ManyToOne(() => users, (user)=>user.config)
  @JoinColumn({name: 'id_users'})
  user: users

  
  @OneToOne(() => users)
  @JoinColumn({ name: "id_users" })
  users: users;

}
