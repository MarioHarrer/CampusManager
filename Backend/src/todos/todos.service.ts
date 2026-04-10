import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}
  create(createTodoDto: CreateTodoDto) {
    const entity = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(entity);
  }

  findAll() {
    return this.todosRepository.find();
  }

  findOne(id: string) {
    return this.todosRepository.findOneBy({ id: id });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todosRepository.update(id, updateTodoDto);
  }

  remove(id: string) {
    return this.todosRepository.delete(id);
  }
}
