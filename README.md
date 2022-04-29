### Setup database

1. Pull & run docker image

- postgres

```bash
docker run -it -d -p 5432:5432 --name postgres-local -e POSTGRES_PASSWORD=password postgres
```

- redis

```bash
docker run --name local-redis -d -p 6379:6379 redis
```

2. Go into docker container

```bash
docker exec -it postgres-local bash
```

3. Login pg

```bash
psql -h localhost -U postgres
```

4. Create user

```bash
CREATE USER "user_login" WITH PASSWORD 'password';
ALTER ROLE "user_login" WITH SUPERUSER;
```

5. Create two databases

```bash
CREATE DATABASE dbtest;

# using for ci test
CREATE DATABASE db-test-integration;
```

6. Export ENV

```bash
export PG_HOST=127.0.0.1
export PG_PORT=5432
export PG_USER=user_login
export PG_PASS=password
export PG_DB=dbtest
export PORT=3131

export REDIS_HOST=127.0.0.1
export REDIS_PORT=6379
export REDIS_CACHE_EXPIRES_IN=604800
```

6. Create tables and insert test data for both of dbtest and db-test-integration
- Open Postgres SQL IDE or PG4Admin and copy SQL command into editor and run on both of databases.

```sql
CREATE TYPE "roleType" AS ENUM ('ADMIN', 'USER', 'EDITOR');

--- create user table
CREATE TABLE public.users (
  id bigserial NOT NULL,
  name varchar(50) NOT NULL,
  username varchar(50) unique NOT NULL,
  password varchar(100) NOT NULL,
  "createdAt" timestamp(6) NULL DEFAULT LOCALTIMESTAMP,
  "roleType" "roleType" default 'USER' NOT NULL,
  CONSTRAINT users_PK PRIMARY KEY (id)
);

--- create index
CREATE INDEX "roleType_IDX"  ON public."users" USING btree ("roleType");
CREATE INDEX "createdAt_IDX"  ON public."users" USING btree ("createdAt");


--- insert users
INSERT INTO public."user"
(id, "fullName", email, "password", provider, "providerId", phone, birthday, avatar, address, "postCode", status, "role", "createdAt", "updateAt")
VALUES('397fb2cc-5688-42ac-9bc3-618205332b6e'::uuid, 'hung', 'dev@gmail.com', '$2b$10$4Kev2UivSyKyKpg83zLY8uAlOu/zPy0IBMWzrdKM7C6K6B7lHo4LO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USER'::roleType, '2022-02-19 08:52:36.762', '2022-02-19 08:52:36.762');
INSERT INTO public."user"
(id, "fullName", email, "password", provider, "providerId", phone, birthday, avatar, address, "postCode", status, "role", "createdAt", "updateAt")
VALUES('10978bcc-cc80-4518-b0fa-4a72f1d0a85c'::uuid, 'Admin', 'admin@gmail.com', '$2b$10$TdlyHNiuml1BnSbCT1djcupxdJVto9/a1HjlhirK902dobTSuyBlC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USER'::roleType, '2022-02-19 08:52:45.824', '2022-02-19 08:52:45.824');

--- insert product
INSERT INTO public.product
(id, "name", price, brand, color, "createdAt", "updatedAt", "productGroupId", status)
VALUES('7ec2122a-b951-428a-8750-aeede5c1ee1b', 'Product 1', 50, 'Adidas', 'White', '2022-04-26 09:50:21.476', '2022-04-26 09:50:21.476', 'c8c1d215-b3cb-49bf-abf9-a3e23745c019'::uuid, NULL);
INSERT INTO public.product
(id, "name", price, brand, color, "createdAt", "updatedAt", "productGroupId", status)
VALUES('f4a6f036-084f-4070-83fc-2c4df029f09f', 'Product 2', 50, 'Nike', 'Red', '2022-04-26 09:50:29.840', '2022-04-26 09:50:29.840', 'df0cab8e-4db5-4bc3-afb6-6d73e9f83eca'::uuid, NULL);
INSERT INTO public.product
(id, "name", price, brand, color, "createdAt", "updatedAt", "productGroupId", status)
VALUES('bec7c3e9-3402-48af-a635-022cc01f86ae', 'Product 3', 50, 'Rock', 'Black', '2022-04-26 09:50:51.081', '2022-04-26 09:50:51.081', '14e1b6a7-4c12-4875-bc81-321c3b9a1ddc'::uuid, NULL);


```

### Setting project before running

1.Install npm packages

```bash
npm install
```
3. Commands

- Development

```bash
npm run dev
```

- Run Testing

```bash
npm run test
```

