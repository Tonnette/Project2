module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [1]
        // }
      },
      blog: {
        type: DataTypes.TEXT,
        allowNull: false,
        // validate: {
        //   len: [1]
        // }
      }
    });
    return Blog;
  };
  