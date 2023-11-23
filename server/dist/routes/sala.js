"use strict";
const { Router } = require("express");
const { getSalas, getSala, deleteSala, postSala, updateSala } = require("../controllers/sala");
const router = Router();

router.get('/salas', getSalas);
router.get('/salas/:id', getSala);
router.delete('/salas/:id', deleteSala);
router.post('/salas', postSala);
router.put('/salas/:id', updateSala);

module.exports = router;
