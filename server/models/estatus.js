const estatus = (sequelize, DataTypes) => {
  const Estatus = sequelize.define('estatus', {
    estatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Estatus.associate = models => {
    Estatus.hasMany(models.Denuncia);
  };

  return Estatus;
};

export default estatus;
