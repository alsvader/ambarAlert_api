const denuncia = (sequelize, DataTypes) => {
  const Denuncia = sequelize.define('denuncia', {
    latitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    vestuario: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fechaDesaparecio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    direccionDesaparecio: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    amberStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Denuncia.associate = models => {
    Denuncia.belongsTo(models.Municipio);
    Denuncia.belongsTo(models.Usuario);
    Denuncia.belongsTo(models.Hijo);
    Denuncia.belongsTo(models.Estatus);
    Denuncia.belongsToMany(models.Dependencia, {
      through: models.DependenciaDenuncia
    });
  };

  return Denuncia;
};

export default denuncia;
