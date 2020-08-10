import sequelize from "../utils/DB";

import { DataTypes, Model, Optional } from "sequelize";
import { UserModel } from "./user.model";
import { FeedbackAttributes } from "./feedback.model";
import { PassportModel } from "./passport.model";

interface AchivementAttributes {
  id: string,
  title: string
  month: string
  year: string
  company: string
  description: string
  titleObteined: string
  resultObteined: string
  valueObteined: string
  awardFilename: string
  feedbacks?: FeedbackAttributes | FeedbackAttributes['id'];
}

interface AchivementCreationAttributes extends Optional<AchivementAttributes, "id"> { }

interface AchivementInstance extends Model<AchivementAttributes, AchivementCreationAttributes>, AchivementAttributes { }

export const AchivementModel = sequelize.define<AchivementInstance>("Achivement", {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titleObteined: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resultObteined: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valueObteined: {
    type: DataTypes.STRING,
    allowNull: false
  },
  awardFilename: {
    type: DataTypes.STRING,
    allowNull: true
  },
})

PassportModel.belongsToMany(AchivementModel, { through: 'PassportAchivement'});
AchivementModel.belongsToMany(PassportModel, { through: 'PassportAchivement'});

UserModel.hasOne(AchivementModel, {
  foreignKey: {
    allowNull: false
  }
});
AchivementModel.belongsTo(UserModel);
