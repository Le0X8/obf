module.exports = {
  o: (input) => {
    let prev = 0;
    const out = Buffer.alloc(input.byteLength);

    for (let i = 0; i < input.byteLength; i++) {
      const val =
        input.readUint8(i) < prev
          ? input.readUint8(i) - prev + 256
          : input.readUint8(i) - prev;
      prev += val;
      prev %= 256;
      out.writeUint8(val, i);
    }

    return out;
  },
  d: (input) => {
    let prev = 0;
    const out = Buffer.alloc(input.byteLength);

    for (let i = 0; i < input.byteLength; i++) {
      const val = input.readUint8(i) + prev;
      prev = val % 256;
      out.writeUint8(prev, i);
    }

    return out;
  },
};
