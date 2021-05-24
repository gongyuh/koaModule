import Router from 'koa-router'
import PublicController from '../api/PublicController'
import contentController from '../api/ContentController'

const router = new Router()

router.prefix('/public')

//获取图形验证码
router.get('/getCaptcha',PublicController.getCaptcha)

// 获取文章列表
router.get('/list', contentController.getPostList)
// 温馨提醒
router.get('/tips', contentController.getTips)

// 友情链接
router.get('/links', contentController.getLinks)

// 回复周榜
router.get('/topWeek', contentController.getTopWeek)

export default router