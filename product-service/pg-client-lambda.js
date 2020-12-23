'use strict'
const { Client } = require('pg');

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

module.exports.invoke = async event => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const ddlResult = await client.query(`
      create table if not exists todo_list (
        id serial primary keys,
        list_name text,
        list_description text
      )`);
    const ddlResult2 = await client.query(`
      create table if not exists todo_item (
        id serial primary key,
        list_id integer,
        item_name text,
        item_description text,
        foreign key ("list_id") references "todo_list" ("id")
      )`);

    const dmlResult = await client.query(`
      insert into todo_list (list_name, list_description) values
        ('Important', 'Important thing to do'),
        ('Secondary', 'Minor matters')
    `);
    const dmlResult2 = await client.query(`
      insert into todo_item (list_id, item_name, item_description) values
        (1, 'Learn lambda', 'Learn how to work with Amazon Lambda'),
        (1, 'Learn RDS', 'Learn how to work with Amazon Relational Database Servise'),
        (1, 'Learn EC2', 'Learn how to work with Amazon Relational Elastic Compute Cloud'),
        (2, 'Learn IDE shortcuts', 'Learn how to work with shortcuts in preffered IDE'),
        (2, 'Learn DBeaver features', 'Learn how to work with DBeaver tool'),
    `);

    const { rows: todo_items } = await client.query(`select * from todo_item`);
    console.log(todo_items);

  } catch (err) {
    console.error('Error during database request executing', err);
  } finally {
    client.end();
  }
};
