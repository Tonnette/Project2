module.exports = function(sequelize, DataTypes) {
    var Movies = sequelize.define("Movies", {
        // Giving the Author model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Movies.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Movies.hasMany(models.Comments, {
            onDelete: "cascade"
        });
    };

    return Movies;
};