import User from './test'

//mongoose的基本使用方式

//增
const user = {
    name:'hello',
    age:30,
    email:'hello@qw.com'
}

const insertMethods = async () => {
    const data = new User(user)
    const result = data.save()
    console.log(result)
}


//查

const findMethods = async () => {
    const result = await User.find()
    console.log(result)
}

//改
const updateMethods = async () => {
    const result = await User.updateOne({name:'hello'},{email:'hello@qq.com'})
    console.log(result)
}

//删除
const delMethods = async () => {
    const result = await User.deleteOne({name:'hello'})
    console.log(result)
}

delMethods()
