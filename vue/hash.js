function Router() {
    this.routes = []

    // 添加路由
    this.add = function (re, handler) {
        this.routes.push({ re, handler })
    }

    // 监听 url 变化
    this.listen = function () {
        // 路由切换
        window.addEventListener('hashchange', (event) => {
            var hash = window.location.hash.slice(1)
            for(var i = 0; i < this.routes.length; i++) {
                if (hash === this.routes[i].re) {
                    this.routes[i].handler.apply()
                }
            }
        }, false)
    }

    // 前进到一个新的url
    this.push = function (path) {
        window.location.hash = path || ''
    }

    // 替换成一个新的url
    this.replace = function (path) {
        path = path || ''
        var i = window.location.href.indexOf('#')
        window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path)
    }

    // 返回到上一个url
    this.back = function () {
        window.history.back()
    }
}