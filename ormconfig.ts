// export const AppDataSource = new DataSource({
//   type: "postgres",
//   port: 5432,
//   username: "postgres",
//   password: "admin",
//   database: "flipcart",
//   entities: ['dist/**/*.entity.js'],   
//   migrations: ['dist/migration/**/*.js'],
//   synchronize: false, 
// })


import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
  name: `default`,
  type: 'postgres',
  host: 'localhost', 
  port: 5432, 
  username: "postgres",
  password: "admin",
  database: "flipcart", 
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsTableName: "migrations",
  migrations: ["dist/migrations/*.js"],
//   cli: {
//  migrationsDir: "migrations"
//   }
};

export const dataSource = new DataSource(dataSourceOptions)

dataSource.initialize()
  .then(() => {
    //console.log("dataSourceOptions==>", dataSourceOptions)
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });