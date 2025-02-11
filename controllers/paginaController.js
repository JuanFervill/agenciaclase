import { Viaje } from "../models/Viaje.js";
import {Testimonial} from "../models/testimoniales.js";
import moment from "moment";

const paginaInicio = async (req, res) => {

    const promiseDB=[];

    promiseDB.push(Viaje.findAll({limit: 3}));

    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    //Consultar 3 viajes del modelo de Viaje
    try{
        const resultado = await Promise.all(promiseDB);
        const testimonios = await Testimonial.findAll({
            limit: 3,
            order: [["Id", "DESC"]],
        });

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: testimonios,
            moment: moment,
        });

    }catch(err){
        console.log(err);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaTestimonios = async (req, res) => {
    try{
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        });
    }catch(err){
        console.log(err);
    }
};

const paginaDetallesViajes = async (req, res) => {
    const { slug } = req.params;
    try {
        const resultado = await Viaje.findOne({where: {slug: slug}});
        res.render('viaje', {
            pagina: 'Información del viaje',
            resultado: resultado,
            moment: moment,
    })
    }catch (error) {
        console.log(error);
    }
};

const paginaViajes = async (req, res) => {
        const viajes = await Viaje.findAll();
        res.render('viajes', {
            pagina: 'Viajes Disponibles',
            viajes: viajes,
            moment: moment,
        });
};

const guardarTestimonios = async (req, res) => {

    const { nombre, correo, mensaje } = req.body;

    const errores =[];

    if(nombre.trim()===''){
        errores.push({mensaje: 'El nombre es obligatorio'});
    }
    if(correo.trim()===''){
        errores.push({mensaje: 'El email es obligatorio'});
    }
    if(mensaje.trim()===''){
        errores.push({mensaje: 'El mensaje es obligatorio'});
    }
    if (errores.length>0){
        try{
            const testimonios = await Testimonial.findAll();
        }catch (e) {
            console.log(e);
        }
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores: errores,
            nombre: nombre,
            mensaje: mensaje,
            correo: correo,
            testimonios: testimonios,
        })
    }else{
        try{
            await Testimonial.create({nombre: nombre, correoelectronico: correo, mensaje: mensaje});
            res.redirect('/testimonios');
        }catch (error) {
            console.log(error);
        }
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimonios,
    paginaViajes,
    paginaDetallesViajes,
    guardarTestimonios,
};
