import Sequelize from "sequelize";
import db from "../config/db.js";

export const Viaje = db.define("viaje", {
    titulo: {
        type: Sequelize.STRING,
    },
    precio: {
        type: Sequelize.STRING,
    },
    fecha_ida: {
        type: Sequelize.DATE,
    },
    fecha_vuelta: {
        type: Sequelize.DATE,
    },
    imagen: {
        type: Sequelize.STRING,
    },
    descripcion: {
        type: Sequelize.STRING,
    },
    disponibles: {
        type: Sequelize.BOOLEAN,
    },
    slug: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false // Evita que Sequelize busque createdAt y updatedAt
});

