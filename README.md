# Obfuscate data

In this repository I'm collecting approaches to obfuscate data.

All of these approaches are cryptographically insecure, so don't use them as an alternative to encryption.

Feel free to contribute your own approaches and combine them in every way you like.

[I also added a simple JavaScript implementation of the algorithms.](#jsREADME.md)

## How could this be useful?

- You can use it as a preprocessor for encryption. For example, you can obfuscate sensitive data and then encrypt it, so possible attackers who are able to obtain the decrypted data can't read it properly if they don't know the obfuscation algorithm.
- If you want to store critical data such as user passwords, you can use an obfuscation algorithm before hashing it with a secure hashing algorithm. This way, even if the database is compromised, the passwords are way harder to obtain because possible attackers looking up hashes in rainbow tables are less likely to find them. Also, dictionary attacks would fail completely if the obfuscation algorithm is unknown. If the data is salted before obfuscation, this will make it virtually impossible to crack entire databases of passwords in a reasonable amount of time.

## The approaches

### Naive ones

#### Base64

Throwing your data through a Base64 encoder is a very simple way to obfuscate it.

You shouldn't use this alone, but you can use it as a preprocessor for other algorithms because Base64-encoded data can be detected easily.

#### Rot13

Rot13 is a simple algorithm that shifts every letter by 13 places in the alphabet.

#### RotX

RotX is a simple algorithm that shifts every letter by X places in the alphabet.

### Binary level but still naive

#### Bitwise NOT

Bitwise NOT is a simple algorithm that inverts every bit in the data.

#### Byte reversal

Byte reversal is a simple algorithm that reverses the order of the bytes in the data.

### Creative ones

#### Byte difference

Byte difference is an algorithm that calculates the difference between every byte and the next one and stores it at its place.

**JavaScript reference implementation:**

_Obfuscate:_

```js
(input) => {
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
};
```

_Deobfuscate:_

```js
(input) => {
  let prev = 0;
  const out = Buffer.alloc(input.byteLength);

  for (let i = 0; i < input.byteLength; i++) {
    const val = input.readUint8(i) + prev;
    prev = val % 256;
    out.writeUint8(prev, i);
  }

  return out;
};
```
