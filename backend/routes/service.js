const express = require('express');
const { deleteServiceById,getEquipmentByServiceId,addService,updateServiceById,fetchServiceById, getAllServices ,fetchServices} = require('../controllers/serviceController');
const router = express.Router()
router.post('/add',addService)
router.get('/liste',fetchServices)
router.get('/:serviceId/equipement',getEquipmentByServiceId)
router.get('/:serviceId',fetchServiceById)
router.put('/:serviceId',updateServiceById)
router.delete('/:serviceId',deleteServiceById)
module.exports = router 