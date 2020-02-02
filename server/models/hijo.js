const hijo = (sequelize, DataTypes) => {
  const Hijo = sequelize.define('hijo', {
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
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    genero: {
      type: DataTypes.ENUM(['Hombre', 'Mujer']),
      allowNull: false
    },
    estatura: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discapacidad: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    padecimiento: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    seniaParticular: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estatus: {
      type: DataTypes.ENUM(['OK', 'DESAPARECIDO']),
      allowNull: false,
      defaultValue: 'OK'
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    actaNacimiento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statusDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Hijo.associate = models => {
    Hijo.belongsTo(models.Usuario);
    Hijo.belongsTo(models.CatCabello);
    Hijo.belongsTo(models.CatOjos);
    Hijo.hasMany(models.FotosHijo);
  };

  return Hijo;
};

export default hijo;
