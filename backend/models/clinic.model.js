module.exports = (sequelize, DataTypes) => {
    const Clinic = sequelize.define("Clinic", {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      city_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING
    });
  
    Clinic.associate = (models) => {
      Clinic.belongsTo(models.City, { foreignKey: 'city_id' });
      Clinic.hasMany(models.AppointmentRequest, { foreignKey: 'clinic_id' });
      Clinic.hasMany(models.Comment, { foreignKey: 'clinic_id' });
    };
  
    return Clinic;
  };