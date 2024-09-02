// TODO DELETE ME
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/**
 * @returns {string} ChatGPT generated UUID #trust
 */
export function createUUID() {
  // Generate an array of 16 random bytes
  const cryptoObj = window.crypto;
  const bytes = new Uint8Array(16);
  cryptoObj.getRandomValues(bytes);

  // Set the version to 4 (0100)
  bytes[6] = (bytes[6] & 0x0F) | 0x40;
  // Set the variant to 10xx (variant 1)
  bytes[8] = (bytes[8] & 0x3F) | 0x80;

  // Convert bytes to a UUID string
  const hexDigits = [];
  for (const byte of bytes) {
    hexDigits.push((byte >>> 4).toString(16));
    hexDigits.push((byte & 0x0F).toString(16));
  }

  const uuid = hexDigits.join('');

  // Format the UUID according to the UUIDv4 standard
  return [
    uuid.slice(0, 8),
    uuid.slice(8, 12),
    uuid.slice(12, 16),
    uuid.slice(16, 20),
    uuid.slice(20),
  ].join('-');
}
