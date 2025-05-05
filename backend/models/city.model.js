module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("City", {
      name: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      country: DataTypes.STRING
    });
  
    City.associate = (models) => {
      City.hasMany(models.Clinic, { foreignKey: 'city_id' });
    };
  
    return City;
  };