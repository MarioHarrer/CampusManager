import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  date: Date;
  @Column({ nullable: true })
  startTime: Date;
  @Column({ nullable: true })
  endTime: Date;
  @Column({ nullable: true })
  userId: string;
}
