import sequelize from "../utils/DB";

import { DataTypes, Model, Optional } from "sequelize";
import { AchivementModel } from "./achivement.model";

export interface FeedbackAttributes {
  id: string,
  fullname: string
  validated: string
  description: string
  skillsWithExperience: string
  skillsWithImproving: string
}

interface FeedbackCreationAttributes extends Optional<FeedbackAttributes, "id"> { }

interface FeedbackInstance extends Model<FeedbackAttributes, FeedbackCreationAttributes>, FeedbackAttributes { }

export const FeedbackModel = sequelize.define<FeedbackInstance>("Feedback", {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  validated: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skillsWithExperience: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skillsWithImproving: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

AchivementModel.hasOne(FeedbackModel, {
  foreignKey: {
    allowNull: false
  }
});
FeedbackModel.belongsTo(AchivementModel);
