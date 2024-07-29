const express = require('express')
const {
    getEquipements,
    getEquipement,
    createEquipement,
    deleteEquipement,
    updateEquipement,
    getAllDataEquipement,
} = require('../controllers/equipementController')
const router = express.Router()
router.get('/list', getEquipements)
router.get('/ticket', getAllDataEquipement)
// GET a single rec
router.get('/:id', getEquipement)
// POST rec
router.post('/add', createEquipement)
// DELETE Equipement
router.delete('/:id', deleteEquipement)
// UPDATE Equipement
router.patch('/:id', updateEquipement )
module.exports = router

