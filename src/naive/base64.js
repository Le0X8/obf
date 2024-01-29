module.exports = {
  o: (input) => Buffer.from(input.toString('base64'), 'utf8'),
  d: (input) => Buffer.from(input.toString('utf8'), 'base64')
};