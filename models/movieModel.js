module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
      // Giving the Movie model a name of type STRING
      movie_name: {
        // needs to be unique
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    });
  
    Movie.associate = function(models) {
      // Associating Movie with Blogs
      // When an Movie is deleted, also delete any associated Blogs
      Movie.hasMany(models.Blog, {
        onDelete: "cascade"
      });
    };
  
    return Movie;
  };