module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define("Photo", {
      user_id: DataTypes.INTEGER,
      filename: DataTypes.STRING,
      uploaded_at: DataTypes.DATE
    });
  
    Photo.associate = (models) => {
      Photo.belongsTo(models.User, { foreignKey: 'user_id' });
      Photo.hasMany(models.AnalysisResult, { foreignKey: 'photo_id' });
    };
  
    return Photo;
  };