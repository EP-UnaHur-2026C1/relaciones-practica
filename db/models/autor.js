'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Autor.hasMany(models.Libro,{foreignKey: 'id_autor', as:'libro'})
    }
  }
  Autor.init({
    nombre: {type: DataTypes.STRING, allowNull:false, length: 255},
    fechaNacimiento: {type: DataTypes.DATEONLY, allowNull: false},
    edad: { 
      type: new DataTypes.VIRTUAL(DataTypes.NUMBER, ['fechaNacimiento']),
      get: function() {
        return Math.floor( (new Date() - new Date(this.get('fechaNacimiento')))  / (1000 * 60 * 60 * 24 * 365.25)) 
      }
    }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Autor'
  });
  return Autor;
};