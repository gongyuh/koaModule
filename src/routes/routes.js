import combineRoutes from 'koa-combine-routers'

import aRouter from './aRouter'
import bRouter from './bRouter'

import PublicRouter from './PublicRouter'
import loginRouter from './loginRouter'

export default combineRoutes(
    aRouter,
    bRouter,
    loginRouter,
    PublicRouter
)