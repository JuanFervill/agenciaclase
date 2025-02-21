import express from "express";
import { paginaInicio, paginaNosotros, paginaTestimonios, paginaViajes, paginaDetallesViajes, guardarTestimonios, paginaReservar, guardarReserva, consultaReserva, muestraReserva, borrarReserva } from "../controllers/paginaController.js";

const router = express.Router();

router.get('/', paginaInicio);
router.get('/testimonios', paginaTestimonios);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetallesViajes);
router.get('/nosotros', paginaNosotros);
router.get('/reserva/:slug', paginaReservar);
router.get('/consulta-reserva', consultaReserva);
router.get('/contacto', (req, res) => {
    res.send('Hola contacto');
});
router.get('/borrar-reserva/:id', borrarReserva);

router.post('/testimonios', guardarTestimonios);
router.post('/reserva/:slug', guardarReserva);
router.post('/consulta-reserva', muestraReserva);
export default router;