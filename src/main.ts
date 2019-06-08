import WebGLClass from './util/WebGLClass';
// x ^ 2 + y ^ 2 = r ^ 2;
const circle = (x: number, y: number, asset: number) => [
  Math.sin(x / asset), // x
  Math.cos(y / asset), // y
  1, // z
];
const gl2 = new WebGLClass(600, 600, 'sample');

const math: number[] = [];
for (let i = 0; i < 800; i += 1) {
  math.push(...circle(i, i, 100));
}

gl2.renderingBought(math, false);
