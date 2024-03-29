import mongoose from '../config/DBhelper'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, index: { unique: true }, sparse: true },
    password: { type: String },
    name: { type: String },
    created: { type: Date },
    updated: { type: Date },
    favs: { type: Number, default: 100 },
    gender: { type: String, default: '' },
    roles: { type: Array, default: ['user'] },
    pic: { type: String, default: '/img/header.jpg' },
    mobile: { type: String, match: /^1[3-9](\d{9})$/, default: '' },
    status: { type: String, default: '0' },
    regmark: { type: String, default: '' },
    location: { type: String, default: '' },
    isVip: { type: String, default: '0' },
    count: { type: Number, default: 0 }
  })

const UserModel = mongoose.model('users', UserSchema )

UserSchema.pre('save', function (next) {
    this.created = new Date()
    next()
  })
  
  UserSchema.pre('update', function (next) {
    this.updated = new Date()
    next()
  })
  
  UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Error: Monngoose has a duplicate key.'))
    } else {
      next(error)
    }
  })
  

export default UserModel