module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      user_id: DataTypes.INTEGER,
      clinic_id: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      created_at: DataTypes.DATE
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, { foreignKey: 'user_id' });
      Comment.belongsTo(models.Clinic, { foreignKey: 'clinic_id' });
    };
  
    return Comment;
  };