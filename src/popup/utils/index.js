import CryptoJS from 'crypto-js'

//aes加密
export function aesEncrypt(data, key) {
    // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
    var ciphertext = CryptoJS.AES.encrypt(data, key).toString();
    return ciphertext;
}

//aes解密
export function aesDecrypt(ciphertext, key) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

//用来获取对象中深层属性，比如获取 a.b.c.d
//第一个参数是a，第二个参数为数组，为属性列表[b,c,d]
export function safeAccess(object, path) {
    return object
        ? path.reduce((accumulator, currentValue) => (
            accumulator && accumulator[currentValue]
                ? accumulator[currentValue]
                : null), object)
        : null
}