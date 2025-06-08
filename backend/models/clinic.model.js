module.exports = (sequelize, DataTypes) => {
  const Clinic = sequelize.define("Clinic", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    city_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    }
  });

  Clinic.associate = (models) => {
    Clinic.belongsTo(models.City, { foreignKey: 'city_id' });
    Clinic.belongsTo(models.User, { foreignKey: 'user_id' });
    Clinic.hasMany(models.AppointmentRequest, { foreignKey: 'clinic_id' });
    Clinic.hasMany(models.Comment, { foreignKey: 'clinic_id' });

    Clinic.belongsToMany(models.Treatment, {
      through: models.ClinicTreatments,
      foreignKey: 'clinic_id',
      otherKey: 'treatment_id',
      as: 'treatments'  
    });
  };

  return Clinic;
};