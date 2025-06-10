module.exports = (sequelize, DataTypes) => {
  const Treatment = sequelize.define("Treatment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    applicable_for: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue('applicable_for');
        return raw ? JSON.parse(raw) : [];
      },
      set(value) {
        this.setDataValue('applicable_for', JSON.stringify(value));
      }
    }
  });

  Treatment.associate = (models) => {
    Treatment.hasMany(models.Recommendation, { foreignKey: 'treatment_id' });

    Treatment.belongsToMany(models.Clinic, {
      through: "ClinicTreatments",
      foreignKey: 'treatment_id',
      otherKey: 'clinic_id',
      as: 'clinics' 
    });
  };

  return Treatment;
};