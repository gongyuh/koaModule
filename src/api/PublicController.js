import svgCaptcha from 'svg-captcha'

class PublicController{
    constructor(){}
    async getCaptcha(ctx){
        const newCaptcha = svgCaptcha.create({
			width:150,
			height:38,
			size:4,
			color:true
		})
        console.log(newCaptcha)
        ctx.body={
            code:200,
            data: newCaptcha.data,
        }
    }
}

export default new PublicController()