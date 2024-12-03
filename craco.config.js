const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@api': resolvePath('./src/api'),
            '@images': resolvePath('./src/images'),
            '@styles': resolvePath('./src/styles'),
            '@fonts': resolvePath('./src/styles/fonts'),
            '@components': resolvePath('./src/components'),
            '@pages': resolvePath('./src/pages'),
            '@globalStyles': resolvePath('./src/styles/base/'),
            '@scripts': resolvePath('./src/scripts'),
            '@types': resolvePath('./src/types'),
        }
    },
    
}