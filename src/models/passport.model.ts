import sequelize from "../utils/DB";

import { DataTypes, Model, Optional } from "sequelize";
import { UserModel } from "./user.model";

interface PassportAttributes {
  id: string,
  name: string
}

interface PassportCreationAttributes extends Optional<PassportAttributes, "id"> { }

interface PassportInstance extends Model<PassportAttributes, PassportCreationAttributes>, PassportAttributes { }

export const PassportModel = sequelize.define<PassportInstance>("Passport", {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

UserModel.hasMany(PassportModel, {
  foreignKey: {
    allowNull: false
  }
});
PassportModel.belongsTo(UserModel);
