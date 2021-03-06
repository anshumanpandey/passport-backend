import sequelize from "../utils/DB";

import { DataTypes, Model, Optional } from "sequelize";
import { AchivementModel } from "./achivement.model";

export interface FeedbackAttributes {
  id: string,
  editToken: string
  validated: string
  description: string
  wouldReachAgain: boolean
  isFilled: boolean
  engagementDescription: string
  collegueName: string
  colleguePhonenumber: string
  collegueRole: string
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
    autoIncrement: true,
  },
  editToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isFilled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  validated: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(2000),
    allowNull: true
  },
  engagementDescription: {
    type: DataTypes.STRING(2000),
    allowNull: true
  },
  wouldReachAgain: {
    type: DataTypes.BOOLEAN,
    allowNull: true
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
  skillsWithExperience: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
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
