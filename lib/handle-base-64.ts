export function toUrlSafeBase64(str: string | null) {
  if (str) {
    // Convert string to a Uint8Array (binary representation)
    const utf8Bytes: number[] = new TextEncoder().encode(str) as any;

    // Convert Uint8Array to a Base64 string
    let base64 = btoa(String.fromCharCode.apply(null, utf8Bytes));

    // Make Base64 URL-safe
    base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    return base64;
  }
}

export function fromUrlSafeBase64(base64: string | null) {
  // Replace URL-safe characters with Base64 characters
  if (base64 && base64.length > 4) {
    base64 = base64.replace(/-/g, "+").replace(/_/g, "/");

    // Add padding characters if necessary
    const padding = base64.length % 4;
    if (padding === 2) {
      base64 += "==";
    } else if (padding === 3) {
      base64 += "=";
    }

    // Decode Base64 string to original string
    const binaryString = atob(base64);

    // Convert binary string to UTF-8 string
    const utf8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      utf8Array[i] = binaryString.charCodeAt(i);
    }
    const decodedString = new TextDecoder().decode(utf8Array);

    return decodedString;
  } else {
    return null;
  }
}
