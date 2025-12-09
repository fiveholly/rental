import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user: Partial<User>) {
    const hashed = await bcrypt.hash(user.password!, 10);
    const u = this.repo.create({ ...user, password: hashed });
    return this.repo.save(u);
  }

  async findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
