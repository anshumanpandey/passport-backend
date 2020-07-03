import { Sequelize } from "sequelize"
import path from "path";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '..','passport-db.sqlite'),
  });

export default sequelize;