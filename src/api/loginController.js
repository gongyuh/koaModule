import send from '../config/MailConfig'
import moment from 'moment'

class loginController {
    constructor(){
        
    }
    async forget(ctx){
        const {body} = ctx.request
        try{
            //body.name -> database -> email
            let result = await send({
                code:'1234',
                expire:moment().add(30,'minutes').format('YYYY-MM-DD HH:MM:SS'),
                email:body.username,
                user:'someone'
            })
            ctx.body = {
                code:200,
                data:result,
                msg:'邮件发送成功'
            }
        }catch(e){
            console.log(e)
        }
    }
}

export default new loginController()