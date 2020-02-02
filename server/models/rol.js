const rol = (sequelize, DataTypes) => {
  const Rol = sequelize.define('rol', {
    tipo: {
      type: DataTypes.ENUM('TUTOR', 'DEPENDENCIA', 'ADMIN'),
      allowNull: false,
      defaultValue: 'TUTOR'
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return Rol;
};

export default rol;
