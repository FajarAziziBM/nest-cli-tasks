import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';


@Injectable()
export class TasksRepository {
  async findAll(): Promise<any[]> {
    const data = await readFile('tasks.json', 'utf-8');
    return JSON.parse(data);
  }

  async findOne(id: number) {
    const data = await readFile('tasks.json', 'utf-8');
    const tasks = JSON.parse(data);
    // Cocokkan ID sebagai string
    return tasks.find((task: any) => task.id === String(id));
  }

  async create(taskContent: string) {
    const data = await readFile('tasks.json', 'utf-8');
    const tasks = JSON.parse(data);

    const newId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) + 1 : 1;

    const newTask = {
      id: String(newId),
      content: taskContent,
    };
    tasks.push(newTask);
    await writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8');

    return newTask;
  }
}