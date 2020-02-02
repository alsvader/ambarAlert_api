const estado = (sequelize, DataTypes) => {
  const Estado = sequelize.define('estado', {
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Estado.associate = models => {
    Estado.hasMany(models.Municipio);
  };

  return Estado;
};

export default estado;
