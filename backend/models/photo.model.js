module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define("Photo", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  Photo.associate = (models) => {
    Photo.belongsTo(models.User, { foreignKey: "user_id" });
    Photo.belongsTo(models.Clinic, { foreignKey: "clinic_id" });
    Photo.hasMany(models.AnalysisResult, { foreignKey: "photo_id" });
  };

  return Photo;
};