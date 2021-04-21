import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('67160124', () => {
  it('should pass', async () => {
    const connectionStub = {
      createQueryBuilder: sinon.stub().returnsThis(),
      where: sinon.stub().returnsThis(),
      andWhere: sinon.stub().returnsThis(),
      orderBy: sinon.stub().returnsThis(),
      addOrderBy: sinon.stub().returnsThis(),
      getMany: sinon.stub().resolves([1, 2, 3]),
    };
    const typeormStub = { getConnection: sinon.stub().returns(connectionStub) };
    const { main } = proxyquire('./index.ts', {
      typeorm: typeormStub,
      './foo.ts': {
        foo: sinon.stub().returns(123),
      },
    });
    await main();
    sinon.assert.calledWithExactly(typeormStub.getConnection, 'default');
    sinon.assert.calledWithExactly(connectionStub.createQueryBuilder, 'Reading', 'r');
    sinon.assert.calledWithExactly(connectionStub.where, "r.code = :code AND um = 'KWH'", { code: 1 });
    sinon.assert.calledWithExactly(
      connectionStub.andWhere,
      " measure_date BETWEEN to_date(:startDate,'YYYY-MM-DD') AND to_date(:endDate,'YYYY-MM-DD')",
      {
        startDate: '2020',
        endDate: '2021',
      },
    );
    sinon.assert.calledWithExactly(connectionStub.andWhere, 'r.deleted_at IS NULL');
    sinon.assert.calledWithExactly(connectionStub.orderBy, 'r.deleted_at IS NULL', 'r.measure_date', 'DESC');
    sinon.assert.calledWithExactly(connectionStub.addOrderBy, 'r.reading_type');
    sinon.assert.calledWithExactly(connectionStub.addOrderBy, 'r.band', 'ASC');
  });
});
