module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platform_rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Comments',
    timestamps: true 
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Comment;
};