const path = require('path');
const webpack = require('webpack')
module.exports = {
    configureWebpack:{
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                'Vue': ['vue', 'default'],
                'G': [path.resolve(path.join(__dirname, 'src', 'G', 'index.js')), 'default'],
            }),

        ],
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
