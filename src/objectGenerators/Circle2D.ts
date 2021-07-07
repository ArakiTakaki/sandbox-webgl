// Circle2D(30, [0.1, 0.5, 0.1, 0.1]);
const circleOne = Math.PI * 2;

export default (num: number, attColor: number[]) => {
  const position = [0, 0, 0];
  const index = [1, 1, 1];
  const color = [...attColor];
  const normal = [];

  for (let i = 1; i <= num; i += 1) {
    const r = circleOne / num * i;
    const rx = Math.cos(r);
    const ry = Math.sin(r);
    normal.push(1, 1, 1);
    position.push(rx, ry, 0);
    color.push(...attColor);
  }
  normal.push(1, 1, 1);

  for (let i = 1; i < num; i += 1) {
    index.push(0, i + 1, i);
  }
  index.push(0, 1, num);
  return {
    position,
    index,
    color,
    normal,
  };
};
