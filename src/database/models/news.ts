'use strict';
import {
  type CreationOptional,
  DataTypes,
  Model,
  type Optional,
} from 'sequelize';
import { sequelize } from '.';

export interface NewsAttributes {
  id: number;

  title: string;
  link: string;
  pubDate: Date;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string;

  createdAt?: Date;
  updatedAt?: Date;
}

type NewsCreationAttributes = Optional<NewsAttributes, 'id'>;

class News extends Model<NewsAttributes, NewsCreationAttributes> {
  declare id: CreationOptional<number>;

  declare pubDate: Date;
  declare link: string;
  declare title: string;
  declare content: string;
  declare contentSnippet: string;
  declare guid: string;
  declare categories: string;

  declare createdAt?: Date;
  declare updatedAt?: Date;
}

News.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    pubDate: DataTypes.DATE,
    link: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    contentSnippet: DataTypes.STRING,
    guid: DataTypes.STRING,
    categories: DataTypes.STRING,

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'News',
    tableName: 'Newss',
  },
);

export { News, NewsCreationAttributes };
