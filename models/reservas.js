import Sequelize from "sequelize";
import db from "../config/db.js";

export const Reserva = db.define("reservas",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    viaje:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefono:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    fecha:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    plan:{
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: 'reservas',
    timestamps: false
});

Reserva.sync({ alter: true }).catch(console.error);