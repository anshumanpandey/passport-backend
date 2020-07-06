import sequelize from "../utils/DB";

import { DataTypes, Model, Optional } from "sequelize";
import { AchivementModel } from "./achivement.model";

export interface FeedbackAttributes {
  id: string,
  fullname: string
  validated: string
  description: string
  engagementDescription: string
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
  engagementDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skillsWithExperience: {
    type: DataTypes.STRING,
    allowNull: false,
    get () {
      const rawValue = this.getDataValue('skillsWithExperience');
      return rawValue? rawValue.split(',') : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('skillsWithExperience', value.map(i=>i.trim()).join(','));
      } else if (typeof value == "string") {
        this.setDataValue('skillsWithExperience', value);
      }
    }
  },
  skillsWithImproving: {
    type: DataTypes.STRING,
    allowNull: false,
    get () {
      const rawValue = this.getDataValue('skillsWithImproving');
      return rawValue? rawValue.split(',') : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('skillsWithImproving', value.map(i=>i.trim()).join(','));
      } else if (typeof value == "string") {
        this.setDataValue('skillsWithImproving', value);
      }
    }
  },
})

AchivementModel.hasMany(FeedbackModel, {
  foreignKey: {
    allowNull: false
  }
});
FeedbackModel.belongsTo(AchivementModel);
