// Do `npm i elliptic sha256` before hand

const EC = require("elliptic").ec;
const sha256 = require("sha256");
const ec = new EC("secp256k1");

function uvarint64ToBuf(uint) {
  const result = [];

  while (uint >= 0x80) {
    result.push((uint & 0xff) | 0x80);
    uint >>>= 7;
  }

  result.push(uint | 0);

  return new Buffer.from(result);
}

// Sign transaction with seed
module.exports = function signTransaction(seed, txnHex) {
  const privateKey = ec.keyFromPrivate(seed);
  const transactionBytes = new Buffer.from(txnHex, "hex");
  const transactionHash = new Buffer.from(sha256.x2(transactionBytes), "hex");
  const signature = privateKey.sign(transactionHash);
  const signatureBytes = new Buffer.from(signature.toDER());
  const signatureLength = uvarint64ToBuf(signatureBytes.length);
  const signedTransactionBytes = Buffer.concat([
    transactionBytes.slice(0, -1),
    signatureLength,
    signatureBytes,
  ]);
  return signedTransactionBytes.toString("hex");
};
