import mongoose from '../config/DBhelper'

const Schema = mongoose.Schema

const TestSchma = new Schema({
    'username': {type:String},
    'password':{type:String}
})

const UserModel = mongoose.model('users', TestSchma )

export default UserModel