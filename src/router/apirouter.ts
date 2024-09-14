import { Router } from 'express'
import apiController from '../controller/apiController'
import rateLimit from '../midddleware/rateLimit'

const router = Router()

router.route('/self').get(rateLimit,apiController.self)
router.route('/health').get(apiController.health)

export default router
