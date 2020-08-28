const http = require('http')

function compose (middlewares) {
  return ctx => {
   const dispatch = (i) => {
      const middleware = middlewares[i]
      if(i === middlewares.length) {
        return
      }
      return middleware(ctx, () => dispatch(i+1))
   }
   return dispatch(0)
  }
}

class Application {
 constructor() {
   this.middlewares = []
 }

 use (middleware) {
  this.middlewares.push(middleware)
 }

 listen (...args) {
  const server = http.createServer((req, res) => {
    // 构造 Context 对象
    const ctx = new Context(req, res)

    try {
      const fn = compose(this.middlewares)
      fn(ctx)
    } catch (e) {
      console.error(e)
      ctx.res.statusCode = 500
      ctx.res.write('Internel Server Error')
    }
    
    // ctx.body 为响应内容

    ctx.res.end(ctx.body)
  })
  server.listen(...args)
 }
}

 // 构造一个 Context 的类
 class Context {
  constructor (req, res) {
    this.req = req
    this.res = res
  }
 }

 const app = new Application()

 app.use(async(ctx, next) => {
   ctx.body = 'hello, one'
   await next()
 })

 app.use(async(ctx, next) => {
   ctx.body = 'hello, ----'
   await next()
 })

 app.listen(7000)

 console.log('运行在 localhost: 7000 端口了')