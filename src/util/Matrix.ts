/* 3次元ベクター */
type IVec3 = [number, number, number, ...number[]]
type IScare = [IVec3, IVec3, IVec3, IVec3];
type ITriangle = [IVec3, IVec3, IVec3];

// 拡大縮小 回転 移動
export default class Matrix {
  static GLWidth: number;

  static GLHeight: number;

  static setWidth(width: number) {
    Matrix.GLWidth = width;
  }

  static setHeight(height: number) {
    Matrix.GLHeight = height;
  }

  initState: number[];

  constructor() {
    this.initState = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 2,
    ];
  }

  translate(type: 'present' | 'px', x: number = 0, y: number = 0, z: number = 0) {
    switch (type) {
      case 'present':
        this.initState[12] += x / 100 * 2;
        this.initState[13] += y / 100 * 2;
        this.initState[14] += z / 100 * 2;
        break;
      case 'px':
        this.initState[12] += x / Matrix.GLWidth * 2;
        this.initState[13] += y / Matrix.GLHeight * 2;
        this.initState[14] += z / 100 * 2;
        break;
      default:
        break;
    }

    return this;
  }

  scale(x: number = 0, y: number = 0) {
    this.initState[0] += x / 100;
    this.initState[5] += y / 100;

    return this;
  }

  public create() {
    return new Float32Array(this.initState);
  }
}
