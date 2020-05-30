module.exports = {
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    },
    devServer: {
        proxy: 'https://localhost:3000/',
    },
    pwa: {
        name: "MyMoney",
        short_name: "My Money Financial Helper",
        icons: [
            {
                "src": "./img/now-logo.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "./img/now-logo.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#4DBA87"
    }
};
