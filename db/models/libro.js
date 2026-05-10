'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Libro.belongsTo(models.Autor, {foreignKey: 'autor_id', as:'autor'})
    }
  }
  Libro.init({
    titlo: {type: DataTypes.STRING, allowNull:false, length: 255},
    editorial: {type: DataTypes.STRING, allowNull:false, length: 50},
    anio: {type: DataTypes.NUMBER, allowNull:false}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Libro',
  });
  return Libro;
};