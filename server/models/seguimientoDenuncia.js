const seguimientoDenuncia = (sequelize, DataTypes) => {
  const SeguimientoDenuncia = sequelize.define('seguimientoDenuncia', {
    observacion: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  SeguimientoDenuncia.associate = models => {
    SeguimientoDenuncia.belongsTo(models.DependenciaDenuncia);
  };

  return SeguimientoDenuncia;
};

export default seguimientoDenuncia;
