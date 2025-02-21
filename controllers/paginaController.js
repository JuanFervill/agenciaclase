import { Viaje } from "../models/Viaje.js";
import {Testimonial} from "../models/testimoniales.js";
import { Reserva } from "../models/reservas.js";
import moment from "moment";
import {where} from "sequelize";

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

const paginaReservar = async (req, res) => {
    const { slug } = req.params;
    try{
        const viajer = await Viaje.findOne({where: {slug: slug}});
        res.render('reservas', {
            pagina: 'Reservar un viaje',
            viajer: viajer,
            moment: moment,
        })
    }catch(err){
        console.log(err);
    }
}

const guardarReserva = async (req, res) => {
    const { email, telefono, viaje, fecha, plan } = req.body;
    console.log("Variables que se obtienen del formulario reservas:" + telefono, viaje, fecha, plan );

    const errores = [];
    const exito = "";

    if(email.trim()===''){
        errores.push({mensaje: 'El email es obligatorio'});
    }
    if(telefono.trim()===''){
        errores.push({mensaje: 'El telefono es obligatorio'});
    }
    if(plan.trim()===''){
        errores.push({mensaje: 'El plan es obligatorio'});
    }
    if(errores.length>0){
        try {

        }catch (e){
            console.log(e);
            const viajer=3
        }
    }else{
        const viajer = await Viaje.findOne({where: {titulo: viaje}});
        if(viajer.disponibles>0){
            try {
                await Reserva.create({email: email, telefono: telefono, plan : plan, fecha: moment(fecha, 'DD/MM/YYYY').format('YYYY/MM/DD'), viaje: viaje });
                const disponibles = viajer.disponibles-1;
                await Viaje.update(
                    {disponibles: disponibles},
                    {where: {
                    titulo: viaje
                }})
            }catch (error){
                console.log(error);
            }
            errores.push({mensaje: 'Reserva realizada con éxito'});
        }else {
            errores.push({mensaje: 'No quedan huecos disponibles para este viaje'});
        }
    }
    const viajer = await Viaje.findOne({where: {titulo: viaje}});
    res.render('reservas', {
        pagina: 'Reservar un viaje',
        errores: errores,
        email: email,
        telefono: telefono,
        plan : plan,
        viajer: viajer,
        moment: moment,
    })
}

const consultaReserva = async (req, res) => {
    res.render('verReservas', {
        pagina: 'Sus reservas'
    });
}

const borrarReserva = async (req, res) => {
    const { id } = req.params;
    let mail = "";
    try {
        const reserva = await Reserva.findOne({where: {id: id}});
        mail = reserva.email;
        const disponibles = await Viaje.findOne({where: {titulo: reserva.viaje}, attributes: ['disponibles'] });
        const disp = disponibles.disponibles+1;
        await Viaje.update(
            {disponibles: disp},
            {where: {
                    titulo: reserva.viaje
                }})
        await reserva.destroy();
        const reservas = await Reserva.findAll({where: {email: mail}});
        res.render('verReservas', {
            pagina: 'Sus reservas',
            email: mail,
            reservas: reservas,
            moment: moment,
        })
    }catch (error) {
        console.log(error);
    }
}

const muestraReserva = async (req, res) => {
    const { email } = req.body;
    const errores = [];
    if(email.trim()===''){
        errores.push({mensaje: 'El email es obligatorio'});
    }else{
        try {
            const reservas = await Reserva.findAll({where: {email: email}});
            if(reservas.length<=0){
                errores.push({mensaje: 'No ha realizado ninguna reserva o el correo no existe'});
                res.render('verReservas', {
                    pagina: 'Sus reservas',
                    email: email,
                    errores: errores,
                })
            }else {
                res.render('verReservas', {
                    pagina: 'Sus reservas',
                    email: email,
                    reservas: reservas,
                    moment: moment,
                })
            }
        }catch (e){
            console.log(e);
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
    paginaReservar,
    guardarReserva,
    consultaReserva,
    muestraReserva,
    borrarReserva,
};
