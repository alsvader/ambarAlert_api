const dependencia = (sequelize, DataTypes) => {
  const Dependencia = sequelize.define('dependencia', {
    dependencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true
      }
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Dependencia.associate = models => {
    Dependencia.hasMany(models.Usuario);
    Dependencia.belongsToMany(models.Denuncia, {
      through: models.DependenciaDenuncia
    });
  };

  return Dependencia;
};

export default dependencia;
