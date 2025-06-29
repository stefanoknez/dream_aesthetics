module.exports = (sequelize, DataTypes) => {
    const AnalysisResult = sequelize.define("AnalysisResult", {
        photo_id: DataTypes.INTEGER,
        ear_distance: DataTypes.FLOAT,
        mole_count: DataTypes.INTEGER,
        acne_detected: DataTypes.BOOLEAN,
        wrinkle_score: DataTypes.FLOAT,
        botox_recommended: DataTypes.BOOLEAN,
        face_symmetry: DataTypes.FLOAT,
        generated_at: DataTypes.DATE
    });

    AnalysisResult.associate = (models) => {
        AnalysisResult.belongsTo(models.Photo, {
            foreignKey: "photo_id",
            as: "photo"
        });
        AnalysisResult.hasMany(models.Recommendation, {
            foreignKey: "analysis_result_id"
        });
    };

    return AnalysisResult;
};