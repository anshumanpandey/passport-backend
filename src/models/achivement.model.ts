import sequelize from "../utils/DB";

import { DataTypes, Model, Optional } from "sequelize";
import { UserModel } from "./user.model";
import { FeedbackAttributes } from "./feedback.model";

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
  collegueName: string
  colleguePhonenumber: string
  collegueRole: string
  feedbacks?: FeedbackAttributes | FeedbackAttributes['id'];
}

interface AchivementCreationAttributes extends Optional<AchivementAttributes, "id"> { }

interface UserInstance extends Model<AchivementAttributes, AchivementCreationAttributes>, AchivementAttributes { }

export const AchivementModel = sequelize.define<UserInstance>("Achivement", {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
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
    allowNull: false
  },
  collegueName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colleguePhonenumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  collegueRole: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

UserModel.hasOne(AchivementModel, {
  foreignKey: {
    allowNull: false
  }
});
AchivementModel.belongsTo(UserModel);
