const catCabello = (sequelize, DataTypes) => {
  const CatCabello = sequelize.define('catCabello', {
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  CatCabello.associate = models => {
    CatCabello.hasMany(models.Hijo);
  };

  return CatCabello;
};

export default catCabello;
