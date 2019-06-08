/* 3次元ベクター */
type IVec3 = [number, number, number, ...number[]]
type IScare = [IVec3, IVec3, IVec3, IVec3];
type ITriangle = [IVec3, IVec3, IVec3];

// 拡大縮小 回転 移動
export default class Matrix {
  GLWidth: number;

  GLHeight: number;

  public static initState = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    1, 0, 0, 1,
    0, 0, 0, 1,
  ] as const;

  constructor(width: number, heigth: number) {
    this.GLHeight = heigth;
    this.GLWidth = width;
  }

  public square(width: number, height: number): number[] {
    return [
      (height / this.GLHeight), (width / this.GLWidth), 0,
      (-height / this.GLHeight), (width / this.GLWidth), 0,
      (-height / this.GLHeight), (-width / this.GLWidth), 0,
      (height / this.GLHeight), (-width / this.GLWidth), 0,
    ];
  }

  //   public circle(x:number, y:number, asset: number): number[] {
  //     return [Math.sin(x / asset), Math.cos(y / asset), 0];
  //   }
}
