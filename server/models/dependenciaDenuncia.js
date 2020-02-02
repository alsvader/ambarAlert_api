const dependenciaDenuncia = (sequelize, DataTypes) => {
  const DependenciaDenuncia = sequelize.define('dependenciaDenuncia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  DependenciaDenuncia.accosiate = models => {
    DependenciaDenuncia.hasMany(models.SeguimientoDenuncia);
  };

  return DependenciaDenuncia;
};

export default dependenciaDenuncia;
