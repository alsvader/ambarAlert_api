const fotosHijo = (sequelize, DataTypes) => {
  const FotosHijo = sequelize.define('fotosHijo', {
    foto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  FotosHijo.associate = models => {
    FotosHijo.belongsTo(models.Hijo);
  };

  return FotosHijo;
};

export default fotosHijo;
