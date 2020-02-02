const catOjos = (sequelize, DataTypes) => {
  const CatOjos = sequelize.define('catOjos', {
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

  CatOjos.associate = models => {
    CatOjos.hasMany(models.Hijo);
  };

  return CatOjos;
};

export default catOjos;
