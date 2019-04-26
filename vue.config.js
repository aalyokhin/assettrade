module.exports = {
  filenameHashing: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    output: {
      filename: 'tagcloud.js',
    },
  },
};
