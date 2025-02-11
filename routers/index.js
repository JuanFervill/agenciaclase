import express from "express";
import { paginaInicio, paginaNosotros, paginaTestimonios, paginaViajes, paginaDetallesViajes, guardarTestimonios } from "../controllers/paginaController.js";

const router = express.Router();

router.get('/', paginaInicio);
router.get('/testimonios', paginaTestimonios);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetallesViajes);
router.get('/nosotros', paginaNosotros);
router.get('/contacto', (req, res) => {
    res.send('Hola contacto');
});

router.post('/testimonios', guardarTestimonios);
export default router;
