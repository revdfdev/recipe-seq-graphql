export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      notEmpty: {
        msg: "Username should not be empty"
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: {
        msg: "Email is not valid"
      },
      notEmpty: {
        msg: "Email should not empty"
      },
      isUnique: async (value, next) => {
        try {
          const user = await User.find({
            email: value
          })
          if (user) {
            next("Email already in use")
          } else {
            next()
          }
        } catch (err) {
          return next()
        }
      }
    },
    joinDate: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  }, {
      freezeTableName: true,
      timestamps: false
    });
  
  User.associate = models => {

  }

  return User;
}