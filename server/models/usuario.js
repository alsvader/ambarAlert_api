const usuario = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuario', {
    numCelular: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoConfirmacion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true
      }
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Usuario.associate = models => {
    Usuario.belongsTo(models.Rol);
    Usuario.belongsTo(models.Dependencia, { foreignKey: { allowNull: true } });
    Usuario.hasMany(models.Hijo);
    Usuario.hasOne(models.Persona, { foreignKey: 'id' });
  };

  return Usuario;
};

export default usuario;
