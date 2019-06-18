import HSVA from './HSVA';

export default (
  row: number,
  column: number,
  rad: number,
) => {
  const position: number[] = [];
  const normal: number[] = [];
  const color: number[] = [];
  const index: number[] = [];

  for (let i = 0; i <= row; i += 1) {
    const r = Math.PI / row * i;
    const ry = Math.cos(r);
    const rr = Math.sin(r);
    for (let j = 0; j <= column; j += 1) {
      const tr = Math.PI * 2 / column * j;
      const tx = rr * rad * Math.cos(tr);
      const ty = ry * rad;
      const tz = rr * rad * Math.sin(tr);
      const rx = rr * Math.cos(tr);
      const rz = rr * Math.sin(tr);

      const tc = HSVA(360 / row * i, 1, 1, 1);

      position.push(tx, ty, tz);
      normal.push(rx, ry, rz);
      if (tc == null) throw Error('color is notfound');
      color.push(tc[0], tc[1], tc[2], tc[3]);
    }
  }

  let r = 0;
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < column; j += 1) {
      r = (column + 1) * i + j;
      index.push(r, r + 1, r + column + 2);
      index.push(r, r + column + 2, r + column + 1);
    }
  }

  return {
    position,
    normal,
    color,
    index,
  };
};
