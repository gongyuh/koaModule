import send from "../config/MailConfig";
import moment from "dayjs";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/index";
import { checkCode } from '../common/utils'
import User from '../model/User'

class loginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request;
    try {
      //body.name -> database -> email
      let result = await send({
        code: "1234",
        expire: moment().add(30, "minutes").format("YYYY-MM-DD HH:MM:SS"),
        email: body.username,
        user: "someone",
      });
      ctx.body = {
        code: 200,
        data: result,
        msg: "邮件发送成功",
      };
    } catch (e) {
      console.log(e);
    }
  }

  async login(ctx) {
    //   debugger
    //   // 接收用户的数据
      // 返回token
      const { body } = ctx.request
      let sid = body.sid
      let code = body.code
      // 验证图片验证码的时效性、正确性
      // let result = await checkCode(sid, code)
      let result = true
      if (result) {
        //验证用户账号密码是否正确
        let checkUserPasswd = false
        let user = await User.findOne({ username: body.username })
        if (user.password === body.password) {
          checkUserPasswd = true
        }
        // mongoDB查库
        if (checkUserPasswd) {
          // 验证通过，返回Token数据
          console.log('Hello login')
          let token = jsonwebtoken.sign({ _id: 'brian' }, config.JWT_SECRET, {
            expiresIn: '1d'
          })
          ctx.body = {
            code: 200,
            token: token
          }
        } else {
          // 用户名 密码验证失败，返回提示
          ctx.body = {
            code: 404,
            msg: '用户名或者密码错误'
          }
        }
      } else {
        // 图片验证码校验失败
        ctx.body = {
          code: 401,
          msg: '图片验证码不正确,请检查！'
        }
      }
    }
  }

export default new loginController();
