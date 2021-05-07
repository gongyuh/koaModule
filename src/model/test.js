import mongoose from '../config/DBhelper'

const Schema = mongoose.Schema

const TestSchma = new Schema({
    name: {type:String},
    age:{type:Number},
    email:{type:String}
})

const TestModel = mongoose.model('users', TestSchma )

export default TestModel