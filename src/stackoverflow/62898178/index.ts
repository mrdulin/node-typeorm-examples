import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import Build from './entity/Build';
import { connectionOptions } from '../../connectionOptions';

createConnection({
  ...connectionOptions,
  entities: [Build],
})
  .then(async (connection) => {
    const build = new Build();
    const build2 = new Build();
    build2.version = 2;
    build.build = build2;
    await connection.manager.save(build);
    const qb = getConnection()
      .createQueryBuilder()
      .select('build')
      .from(Build, 'build')
      .orderBy('build.createdAt', 'DESC');
    const r = await qb.getOne();
    console.log(r, r?.build);
  })
  .catch((error) => console.log(error));
