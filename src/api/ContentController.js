import Post from "../model/Post";

class ContentController {
  async getPostList(ctx) {
    const body = ctx.query;

    const post = new Post({
        uid: { type: String, ref: 'users' },
        title: 'test title',
        content : 'test content',
        catalog : 'share',
        fav : 20,
        isEnd : '0',
        reads : '0',
        answer : '0',
        status : '0',
        isTop : '0',
        sort : '0',
        tags : [{
            name : '精华',
            class : ''
        }]
    })

    const tmp = await post.save()
    console.log('tmp->',tmp)

    const sort = body.sort ? body.sort : "created";
    const page = body.page ? parseInt(body.page) : 0;
    const limit = body.limit ? parseInt(body.limit) : 20;
    const options = {};

    if (body.title) {
      options.title = { $regex: body.title };
    }
    if (body.catalog && body.catalog.length > 0) {
      options.catalog = { $in: body.catalog };
    }
    if (body.isTop) {
      options.isTop = body.isTop;
    }
    if (body.isEnd) {
      options.isEnd = body.isEnd;
    }
    if (body.status) {
      options.status = body.status;
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
        options.tags = { $elemMatch: { name: body.tag } }
    }
    const result = await Post.getList(options, sort, page, limit)

    ctx.body = {
        code: 200,
        data: result,
        msg: '获取文章列表成功',
      }
  }
}

export default new ContentController();
