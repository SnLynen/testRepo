import { Model, DataTypes } from 'sequelize';

export default class Rol extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Rol',
      }
    );
  }
}