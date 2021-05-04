import Router from 'koa-router'
import loginController from '../api/loginController'

const router = new Router()

router.post('/forget',loginController.forget)

export default router