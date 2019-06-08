import WebGLClass from './util/WebGLClass';
// x ^ 2 + y ^ 2 = r ^ 2;
const circle = (x: number, y: number, asset: number) => {
    return [Math.sin(x / asset), Math.cos(y / asset), 1];
}
const gl2 = new WebGLClass(600, 600, 'sample');

let math: number[] = [];
for (let i = 0; i < 800; i++ ) {
    math.push(...circle(i, i, 100));
}

gl2.renderingBought(math, false);
