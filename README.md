# node-typeorm-examples

Learning TypeORM with Node.js By Examples

## Create PostgreSQL docker container

```bash
docker run -d --env-file ./.env -v $(pwd)/db-data:/var/lib/postgresql/data -p 5429:5432 postgres:9.6
```
