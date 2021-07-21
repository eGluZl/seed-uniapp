const path = require('path');
module.exports = {
    configureWebpack:{
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
    },
    chainWebpack: config => {
        config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
            const compile = options.compiler.compile
            options.compiler.compile = (template, ...args) => {
                if (args[0].resourcePath.match(/^pages/)) {
                    template = template.replace(/[\s\S]+?<[\d\D]+?>/, _ => `${_}
						<custom-interactive ref="custom-interactive" style="position: fixed; z-index: 123;" />						
						<u-toast ref="uToast" />
					`)
                }
                return compile(template, ...args)
            }
            return options
        })
    }
}

function resolve(dir) {
    return path.join(__dirname, dir);
}
