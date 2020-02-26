module.exports = function(sequelize, DataTypes) {
    var Movies = sequelize.define("Movies", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Movies.associate = function(models) {
        Movies.hasMany(models.Comments, {
            onDelete: "cascade"
        });
    };

    return Movies;
};