const persona = (sequelize, DataTypes) => {
  const Persona = sequelize.define('persona', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apPaterno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apMaterno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Persona.associate = models => {
    Persona.belongsTo(models.Municipio);
  };

  return Persona;
};

export default persona;
