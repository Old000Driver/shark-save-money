module.exports = {
  lintOnSave: false, //关闭eslint检查
  // 配置使用stylus全局变量
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]',
    }).end().use('svgo-loader').loader('svgo-loader').options({
      plugins: [
        {removeAttrs: {attrs: 'fill'}},
      ],
    });
  },
  publicPath: process.env.NODE_ENV === 'production'
      ? '/shark-save-money-website/'
      : '/',
};
