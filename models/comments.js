module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("movieReviews", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      blog: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    //   created_at: {
    //     created_at: Sequelize.DATE,
    //     allowNull: true,
    //   }
    });
    return Blog;
  };
  