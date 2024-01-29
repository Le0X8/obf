module.exports = {
  base64: require('./naive/base64').o,

  bytediff: require('./creative/bytediff').o,

  deobfuscate: {
    base64: require('./naive/base64').d,

    bytediff: require('./creative/bytediff').d
  }
};