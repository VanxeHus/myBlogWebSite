const path =require("path");
const cleanWebpackPlugin=require("clean-webpack-plugin");

module.exports={
    entry:"./staticFile/js/app.js",
    output:{
        filename:"app.[Hash].js",
        path:path.resolve(__dirname,"staticFile/js/build")
    },
    devtool:"inline-source-map",
};