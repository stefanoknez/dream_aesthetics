module.exports = (sequelize, DataTypes) => {
  const ClinicTreatments = sequelize.define("ClinicTreatments", {
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Clinics",
        key: "id"
      }
    },
    treatment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Treatments",
        key: "id"
      }
    }
  });

  ClinicTreatments.associate = (models) => {
    ClinicTreatments.belongsTo(models.Clinic, {
      foreignKey: "clinic_id"
    });
    ClinicTreatments.belongsTo(models.Treatment, {
      foreignKey: "treatment_id"
    });
  };

  return ClinicTreatments;
};