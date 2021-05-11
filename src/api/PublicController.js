import svgCaptcha from 'svg-captcha'
import { getValue, setValue } from '../config/redisConfig'

class PublicController{
    constructor(){}
    async getCaptcha(ctx){
		const body = ctx.request.query
		console.log(body.sid)
        const newCaptcha = svgCaptcha.create({
			width:150,
			height:38,
			size:4,
			color:true
		})
        console.log(newCaptcha)
		setValue(body.sid, newCaptcha.text, 10 * 60)
        ctx.body={
            code:200,
            data: newCaptcha.data,
        }
    }
}

export default new PublicController()