import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  favTeam: string;
  @Column({ default: 'Salzburg' })
  ort: string;
  @Column({ nullable: true })
  keylockId: string;
}
