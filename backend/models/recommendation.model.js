module.exports = (sequelize, DataTypes) => {
    const Recommendation = sequelize.define("Recommendation", {
      analysis_result_id: DataTypes.INTEGER,
      treatment_id: DataTypes.INTEGER,
      relevance_score: DataTypes.FLOAT,
      notes: DataTypes.STRING
    });
  
    Recommendation.associate = (models) => {
      Recommendation.belongsTo(models.AnalysisResult, { foreignKey: 'analysis_result_id' });
      Recommendation.belongsTo(models.Treatment, { foreignKey: 'treatment_id' });
    };
  
    return Recommendation;
  };