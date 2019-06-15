export default (row: number, column: number, irad: number, orad: number) => {
  const position = [];
  const color = [];
  const index = [];

  for (let i = 0; i <= row; i += 1) {
    const r = Math.PI * 2 / row * i;
    const rr = Math.cos(r);
    const ry = Math.sin(r);
    for (let ii = 0; ii <= column; ii += 1) {
      const tr = Math.PI * 2 / column * ii;
      const tx = (rr * irad + orad) * Math.cos(tr);
      const ty = ry * irad;
      const tz = (rr * irad + orad) * Math.sin(tr);
      position.push(tx, ty, tz);
      // const tc = hsvaカラー関数
      color.push(tx, ty, tz, 1);
    }
  }
  for (let i = 0; i < row; i += 1) {
    for (let ii = 0; ii < column; ii += 1) {
      const r = (column + 1) * i + ii;
      index.push(r, r + column + 1, r + 1);
      index.push(r + column + 1, r + column + 2, r + 1);
    }
  }
  return {
    position,
    color,
    index,
  };
};
