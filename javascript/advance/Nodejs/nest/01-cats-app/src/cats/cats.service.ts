import { Injectable } from '../common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): Cat {
    this.cats.push(cat);
    return cat
  }

  findAll(): Cat[] {
    // throw Error('error......')
    return this.cats;
  }
  findById(id) : Cat{
    return this.cats[id]
  }
}
