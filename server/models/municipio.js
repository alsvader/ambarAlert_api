const municipio = (sequelize, DataTypes) => {
  const Municipio = sequelize.define('municipio', {
    municipio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Municipio.associate = models => {
    Municipio.belongsTo(models.Estado);
    Municipio.hasMany(models.Persona);
    Municipio.hasMany(models.Denuncia);
  };

  return Municipio;
};

export default municipio;
