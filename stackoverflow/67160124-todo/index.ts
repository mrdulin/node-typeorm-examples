import { getConnection } from 'typeorm';
import { foo } from './foo';

export async function main() {
  const startDate = '2020';
  const endDate = '2021';
  const Reading = 'Reading';
  const meter = { code: 1 };
  const queryBuilder = getConnection('default')
    .createQueryBuilder(Reading, 'r')
    .where("r.code = :code AND um = 'KWH'", { code: meter.code })
    .andWhere(" measure_date BETWEEN to_date(:startDate,'YYYY-MM-DD') AND to_date(:endDate,'YYYY-MM-DD')", {
      startDate,
      endDate,
    })
    .andWhere('r.deleted_at IS NULL')
    .orderBy('r.measure_date', 'DESC')
    .addOrderBy('r.reading_type')
    .addOrderBy('r.band', 'ASC');

  const readings = await queryBuilder.getMany();
}
