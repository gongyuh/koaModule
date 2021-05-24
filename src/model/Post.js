import mongoose from '../config/DBhelper'
import moment from 'dayjs'

const Schema = mongoose.Schema

const PostSchema = new Schema({
    uid: { type: String },
    title: { type: String },
    content: { type: String },
    created: { type: Date },
    catalog: { type: String },
    fav: { type: String },
    isEnd: { type: String, default: '0' },
    reads: { type: Number, default: 0 },
    answer: { type: Number, default: 0 },
    status: { type: String, default: '0' },
    isTop: { type: String, default: '0' },
    sort: { type: String, default: 100 },
    tags: {
      type: Array,
      default: [
        {
          name: '',
          class: ''
        }
      ]
    }
  })

PostSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

PostSchema.statics = {
    getList: function (options, sort, page, limit) {
        return this.find(options)
          .sort({ [sort]: -1 })
          .skip(page * limit)
          .limit(limit)
          .populate({
            path: 'uid',
            select: 'name isVip pic'
          })
    },
}

const PostModel = mongoose.model('post', PostSchema )

export default PostModel