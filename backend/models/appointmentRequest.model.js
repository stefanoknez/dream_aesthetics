module.exports = (sequelize, DataTypes) => {
    const AppointmentRequest = sequelize.define("AppointmentRequest", {
      user_id: DataTypes.INTEGER,
      clinic_id: DataTypes.INTEGER,
      datetime: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "declined"),
        defaultValue: "pending"
      }
    });
  
    AppointmentRequest.associate = (models) => {
      AppointmentRequest.belongsTo(models.User, { foreignKey: 'user_id' });
      AppointmentRequest.belongsTo(models.Clinic, { foreignKey: 'clinic_id' });
    };
  
    return AppointmentRequest;
  };