const dependenciaDenuncia = (sequelize, DataTypes) => {
  const DependenciaDenuncia = sequelize.define('dependenciaDenuncia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  DependenciaDenuncia.associate = models => {
    DependenciaDenuncia.hasMany(models.SeguimientoDenuncia);
  };

  return DependenciaDenuncia;
};

export default dependenciaDenuncia;
