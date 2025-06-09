module.exports = (sequelize, DataTypes) => {
  const AppointmentRequest = sequelize.define("AppointmentRequest", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "APPROVED", "REJECTED"),
      defaultValue: "pending",
    },
  });

  AppointmentRequest.associate = (models) => {
    AppointmentRequest.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
    });
    AppointmentRequest.belongsTo(models.Clinic, {
      foreignKey: 'clinic_id',
      as: 'Clinic',
    });
  };

  return AppointmentRequest;
};