import { DataSource } from 'typeorm';

let dataSource: DataSource;

beforeAll(async () => {
  dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_tasks_test',
  });

  await dataSource.initialize();
});

beforeEach(async () => {
  await dataSource.query(
    'SET FOREIGN_KEY_CHECKS = 0',
  );

  for (const entity of dataSource.entityMetadatas) {
    await dataSource.query(
      `TRUNCATE TABLE ${entity.tableName}`,
    );
  }

  await dataSource.query(
    'SET FOREIGN_KEY_CHECKS = 1',
  );
});

afterAll(async () => {
  await dataSource.destroy();
});