const QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
}
const QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
}
const RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
];
const PATTERN_POSITION_TABLE = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]
]
const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)
const QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
const PAD0 = 0xEC
const PAD1 = 0x11

class QRMath {
  constructor() {
    this.EXP_TABLE = new Array(256)
    this.LOG_TABLE = new Array(256)
    for (let i = 0; i < 8; i++) {
      this.EXP_TABLE[i] = 1 << i;
    }
    for (let i = 8; i < 256; i++) {
      this.EXP_TABLE[i] = this.EXP_TABLE[i - 4] ^
          this.EXP_TABLE[i - 5] ^
          this.EXP_TABLE[i - 6] ^
          this.EXP_TABLE[i - 8];
    }
    for (let i = 0; i < 255; i++) {
      this.LOG_TABLE[this.EXP_TABLE[i]] = i;
    }
  }

  glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }

    return this.LOG_TABLE[n];
  }

  gexp(n) {
    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return this.EXP_TABLE[n];
  }
}

const qrMath = new QRMath()

class QRUtil {
  constructor() {

  }

  getBCHTypeInfo(data) {
    let d = data << 10;
    while (this.getBCHDigit(d) - this.getBCHDigit(G15) >= 0) {
      d ^= (G15 << (this.getBCHDigit(d) - this.getBCHDigit(G15)));
    }
    return ((data << 10) | d) ^ G15_MASK;
  }

  getBCHTypeNumber(data) {
    let d = data << 12;
    while (this.getBCHDigit(d) - this.getBCHDigit(G18) >= 0) {
      d ^= (G18 << (this.getBCHDigit(d) - this.getBCHDigit(G18)));
    }
    return (data << 12) | d;
  }

  getBCHDigit(data) {
    let digit = 0;
    while (data !== 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  }

  getPatternPosition(typeNumber) {
    return PATTERN_POSITION_TABLE[typeNumber - 1];
  }

  getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 === 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 === 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 === 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 === 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case QRMaskPattern.PATTERN101:
        return (i * j) % 2 + (i * j) % 3 === 0;
      case QRMaskPattern.PATTERN110:
        return ((i * j) % 2 + (i * j) % 3) % 2 === 0;
      case QRMaskPattern.PATTERN111:
        return ((i * j) % 3 + (i + j) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  }

  getErrorCorrectPolynomial(errorCorrectLength) {
    let a = new QRPolynomial([1], 0);

    for (let i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, qrMath.gexp(i)], 0));
    }

    return a;
  }

  getLengthInBits(mode, type) {
    if (1 <= type && type < 10) {

      // 1 - 9

      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;
        case QRMode.MODE_ALPHA_NUM:
          return 9;
        case QRMode.MODE_8BIT_BYTE:
          return 8;
        case QRMode.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + mode);
      }

    } else if (type < 27) {

      // 10 - 26

      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;
        case QRMode.MODE_ALPHA_NUM:
          return 11;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + mode);
      }

    } else if (type < 41) {

      // 27 - 40

      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;
        case QRMode.MODE_ALPHA_NUM:
          return 13;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + mode);
      }

    } else {
      throw new Error("type:" + type);
    }
  }

  getLostPoint(qrCode) {
    let moduleCount = qrCode.getModuleCount();

    let lostPoint = 0;

    // LEVEL1

    for (let row = 0; row < moduleCount; row++) {

      for (let col = 0; col < moduleCount; col++) {

        let sameCount = 0;
        let dark = qrCode.isDark(row, col);

        for (let r = -1; r <= 1; r++) {

          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }

          for (let c = -1; c <= 1; c++) {

            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }

            if (r === 0 && c === 0) {
              continue;
            }

            if (dark === qrCode.isDark(row + r, col + c)) {
              sameCount++;
            }
          }
        }

        if (sameCount > 5) {
          lostPoint += (3 + sameCount - 5);
        }
      }
    }

    // LEVEL2

    for (let row = 0; row < moduleCount - 1; row++) {
      for (let col = 0; col < moduleCount - 1; col++) {
        let count = 0;
        if (qrCode.isDark(row, col)) count++;
        if (qrCode.isDark(row + 1, col)) count++;
        if (qrCode.isDark(row, col + 1)) count++;
        if (qrCode.isDark(row + 1, col + 1)) count++;
        if (count === 0 || count === 4) {
          lostPoint += 3;
        }
      }
    }

    // LEVEL3

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) &&
            !qrCode.isDark(row, col + 1) &&
            qrCode.isDark(row, col + 2) &&
            qrCode.isDark(row, col + 3) &&
            qrCode.isDark(row, col + 4) &&
            !qrCode.isDark(row, col + 5) &&
            qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }

    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) &&
            !qrCode.isDark(row + 1, col) &&
            qrCode.isDark(row + 2, col) &&
            qrCode.isDark(row + 3, col) &&
            qrCode.isDark(row + 4, col) &&
            !qrCode.isDark(row + 5, col) &&
            qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }

    // LEVEL4

    let darkCount = 0;

    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }

    let ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;

    return lostPoint;
  }

  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  utf16To8(text) {
    let result = '';
    let c;
    for (let i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }
}

const qUtils = new QRUtil()

class QR8bitByte {
  constructor(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }

  getLength(buffer) {
    return this.data.length;
  }

  write(buffer) {
    for (let i = 0; i < this.data.length; i++) {
      // not JIS ...
      buffer.put(this.data.charCodeAt(i), 8);
    }
  }
}

class QRRSBlock {
  constructor(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  static getRsBlockTable(typeNumber, errorCorrectLevel) {
    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4];
      case QRErrorCorrectLevel.M:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;
    }
  }

  static getRSBlocks(typeNumber, errorCorrectLevel) {

    const rsBlock = this.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == null) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    const length = rsBlock.length / 3;

    const list = [];

    for (let i = 0; i < length; i++) {
      const count = rsBlock[i * 3];
      const totalCount = rsBlock[i * 3 + 1];
      const dataCount = rsBlock[i * 3 + 2];

      for (let j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }
    return list;
  }
}

class QRBitBuffer {
  constructor() {
    this.buffer = [];
    this.length = 0;
  }

  get(index) {
    const bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1;
  }

  put(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1);
    }
  }

  getLengthInBits() {
    return this.length;
  }

  putBit(bit) {
    let bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }
    this.length++;
  }

}

class QRPolynomial {
  constructor(num, shift) {
    if (num.length == null) {
      throw new Error(num.length + "/" + shift);
    }

    let offset = 0;

    while (offset < num.length && num[offset] === 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  get(index) {
    return this.num[index];
  }

  getLength() {
    return this.num.length;
  }

  multiply(e) {
    let num = new Array(this.getLength() + e.getLength() - 1);
    for (let i = 0; i < this.getLength(); i++) {
      for (let j = 0; j < e.getLength(); j++) {
        num[i + j] ^= qrMath.gexp(qrMath.glog(this.get(i)) + qrMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  }

  mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }

    let ratio = qrMath.glog(this.get(0)) - qrMath.glog(e.get(0));

    let num = new Array(this.getLength());

    for (let i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }

    for (let i = 0; i < e.getLength(); i++) {
      num[i] ^= qrMath.gexp(qrMath.glog(e.get(i)) + ratio);
    }

    // recursive call
    return new QRPolynomial(num, 0).mod(e);
  }
}

class QRCode {

  constructor(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }

  addData(data) {
    const newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  }

  isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }
    return this.modules[row][col];
  }

  getModuleCount() {
    return this.moduleCount;
  }

  make() {
    if (this.typeNumber < 1) {
      let typeNumber = 1;
      for (typeNumber = 1; typeNumber < 40; typeNumber++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

        let buffer = new QRBitBuffer();
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) {
          totalDataCount += rsBlocks[i].dataCount;
        }

        for (let i = 0; i < this.dataList.length; i++) {
          const data = this.dataList[i];
          buffer.put(data.mode, 4);
          buffer.put(data.getLength(), qUtils.getLengthInBits(data.mode, typeNumber));
          data.write(buffer);
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
      }
      this.typeNumber = typeNumber;
    }
    this.makeImpl(false, this.getBestMaskPattern());
  }

  makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (let row = 0; row < this.moduleCount; row++) {

      this.modules[row] = new Array(this.moduleCount);

      for (let col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null; //(col + row) % 3;
      }
    }

    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }

    if (this.dataCache == null) {
      this.dataCache = this.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }

    this.mapData(this.dataCache, maskPattern);
  }

  setupPositionProbePattern(row, col) {
    for (let r = -1; r <= 7; r++) {

      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (let c = -1; c <= 7; c++) {

        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        this.modules[row + r][col + c] = (0 <= r && r <= 6 && (c === 0 || c === 6)) ||
            (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4);
      }
    }
  }

  getBestMaskPattern() {
    let minLostPoint = 0;
    let pattern = 0;

    for (let i = 0; i < 8; i++) {

      this.makeImpl(true, i);

      let lostPoint = qUtils.getLostPoint(this);

      if (i === 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }

    return pattern;
  }

  setupTimingPattern() {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = (r % 2 === 0);
    }

    for (let c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) {
        continue;
      }
      this.modules[6][c] = (c % 2 === 0);
    }
  }

  setupPositionAdjustPattern() {

    let pos = qUtils.getPatternPosition(this.typeNumber);

    for (let i = 0; i < pos.length; i++) {

      for (let j = 0; j < pos.length; j++) {

        let row = pos[i];
        let col = pos[j];

        if (this.modules[row][col] != null) {
          continue;
        }

        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            this.modules[row + r][col + c] = r === -2 || r === 2 || c === -2 || c === 2 ||
                (r === 0 && c === 0);
          }
        }
      }
    }
  }

  setupTypeNumber(test) {
    let bits = qUtils.getBCHTypeNumber(this.typeNumber);

    for (let i = 0; i < 18; i++) {
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = (!test && ((bits >> i) & 1) === 1);
    }

    for (let i = 0; i < 18; i++) {
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = (!test && ((bits >> i) & 1) === 1);
    }
  }

  setupTypeInfo(test, maskPattern) {
    let data = (this.errorCorrectLevel << 3) | maskPattern;
    let bits = qUtils.getBCHTypeInfo(data);

    // vertical
    for (let i = 0; i < 15; i++) {

      let mod = (!test && ((bits >> i) & 1) === 1);

      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    }

    // horizontal
    for (let i = 0; i < 15; i++) {

      let mod = (!test && ((bits >> i) & 1) === 1);

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }

    // fixed module
    this.modules[this.moduleCount - 8][8] = (!test);

  }

  mapData(data, maskPattern) {

    let inc = -1;
    let row = this.moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;

    for (let col = this.moduleCount - 1; col > 0; col -= 2) {

      if (col === 6) col--;

      while (true) {

        for (let c = 0; c < 2; c++) {

          if (this.modules[row][col - c] == null) {

            let dark = false;

            if (byteIndex < data.length) {
              dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
            }

            let mask = qUtils.getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex === -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }

  }

  createData(typeNumber, errorCorrectLevel, dataList) {
    let rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    let buffer = new QRBitBuffer();

    for (let i = 0; i < dataList.length; i++) {
      let data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), qUtils.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
          buffer.getLengthInBits() +
          ">" +
          totalDataCount * 8 +
          ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 !== 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD0, 8);

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD1, 8);
    }

    return this.createBytes(buffer, rsBlocks);
  }

  createBytes(buffer, rsBlocks) {

    let offset = 0;

    let maxDcCount = 0;
    let maxEcCount = 0;

    let dcdata = new Array(rsBlocks.length);
    let ecdata = new Array(rsBlocks.length);

    for (let r = 0; r < rsBlocks.length; r++) {

      let dcCount = rsBlocks[r].dataCount;
      let ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (let i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      let rsPoly = qUtils.getErrorCorrectPolynomial(ecCount);
      let rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      let modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i++) {
        let modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
      }

    }

    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    let data = new Array(totalCodeCount);
    let index = 0;

    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  }
}

class uQRCode {
  constructor(that, options) {
    this.that = that
    this.defaults = {
      ...{
        size: 354,
        margin: 0,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'png', // 'jpg', 'png'
        errorCorrectLevel: QRErrorCorrectLevel.M,
        typeNumber: -1
      },
      ...options
    }
    this.errorCorrectLevel = QRErrorCorrectLevel
  }

  make() {
    let options = this.defaults
    return new Promise((resolve, reject) => {
      let defaultOptions = {
        canvasId: options.canvasId,
        text: options.text,
        size: this.defaults.size,
        margin: this.defaults.margin,
        backgroundColor: this.defaults.backgroundColor,
        foregroundColor: this.defaults.foregroundColor,
        fileType: this.defaults.fileType,
        errorCorrectLevel: this.defaults.errorCorrectLevel,
        typeNumber: this.defaults.typeNumber
      };
      if (options) {
        for (let i in options) {
          defaultOptions[i] = options[i];
        }
      }
      options = defaultOptions;
      if (!options.canvasId) {
        console.error('uQRCode: Please set canvasId!');
        return;
      }
      this.createCanvas(resolve, reject, options);
    });
  }

  createCanvas(resolve, reject, options) {
    let qrcode = new QRCode(options.typeNumber, options.errorCorrectLevel);
    qrcode.addData(qUtils.utf16To8(options.text));
    qrcode.make();

    let ctx = uni.createCanvasContext(options.canvasId, this.that);
    ctx.setFillStyle(options.backgroundColor);
    ctx.fillRect(0, 0, options.size, options.size);

    let tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
    for (let row = 0; row < qrcode.getModuleCount(); row++) {
      for (let col = 0; col < qrcode.getModuleCount(); col++) {
        let style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
        ctx.setFillStyle(style);
        let x = Math.round(col * tileW) + options.margin;
        let y = Math.round(row * tileW) + options.margin;
        let w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
        let h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
        ctx.fillRect(x, y, w, h);
      }
    }

    setTimeout(() => {
      ctx.draw(false, () => {
        setTimeout(() => {
          uni.canvasToTempFilePath({
            canvasId: options.canvasId,
            fileType: options.fileType,
            width: options.size,
            height: options.size,
            destWidth: options.size,
            destHeight: options.size,
            success: function (res) {
              let resData; // 将统一为base64格式
              let tempFilePath = res.tempFilePath; // H5为base64，其他为相对路径

              // #ifdef H5
              resData = tempFilePath;
              options.success && options.success(resData);
              resolve(resData);
              // #endif

              // #ifdef APP-PLUS
              const path = plus.io.convertLocalFileSystemURL(tempFilePath) // 绝对路径
              let fileReader = new plus.io.FileReader();
              fileReader.readAsDataURL(path);
              fileReader.onloadend = res => {
                resData = res.target.result;
                options.success && options.success(resData);
                resolve(resData);
              };
              // #endif

              // #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO
              uni.getFileSystemManager().readFile({
                filePath: tempFilePath,
                encoding: 'base64',
                success: res => {
                  resData = 'data:image/png;base64,' + res.data;
                  options.success && options.success(resData);
                  resolve(resData);
                }
              })
              // #endif

              // #ifndef H5 || APP-PLUS || MP-WEIXIN || MP-QQ || MP-TOUTIAO
              if (plus) {
                const path = plus.io.convertLocalFileSystemURL(tempFilePath) // 绝对路径
                let fileReader = new plus.io.FileReader();
                fileReader.readAsDataURL(path);
                fileReader.onloadend = res => {
                  resData = res.target.result;
                  options.success && options.success(resData);
                  resolve(resData);
                };
              } else {
                uni.request({
                  url: tempFilePath,
                  method: 'GET',
                  responseType: 'arraybuffer',
                  success: res => {
                    resData = `data:image/png;base64,${uni.arrayBufferToBase64(res.data)}`; // 把arraybuffer转成base64
                    options.success && options.success(resData);
                    resolve(resData);
                  }
                })
              }
              // #endif
            },
            fail: function (error) {
              options.fail && options.fail(error);
              reject(error);
            },
            complete: function (res) {
              options.complete && options.complete(res);
            }
          }, this.that);
        }, options.text.length + 100);
      });
    }, 150);
  }
}

export {uQRCode, QRErrorCorrectLevel}
