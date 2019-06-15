import { Matrix4 } from 'matrixgl';
import CanvasManager from '../core/CanvasManager';
import { IRenderObjectSetting } from '../constants/interfaces';
import { SHADER_TYPE } from '../core/WebGLClass';

export const torus = (row: number, column: number, irad: number, orad: number) => {
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
      index.push(r, r + column, r + 1);
      index.push(r + column + 1, r + column + 2, r + 1);
    }
  }
  return {
    position,
    color,
    index,
  };
};

const vertexSource = `
attribute vec3 position;
attribute vec4 color;
uniform   mat4 mvpMatrix;
varying   vec4 vColor;

void main(void){
  vColor = color;
  gl_Position = mvpMatrix * vec4(position, 1.0);
}
`;
// const rgba = [0.0, 0.0, 0.0, 1.0]; // Red, Green, Blue, Alpha
const fragmentSource = `
precision mediump float;

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`;
const vertexName = 'v1';
const fragmentName = 'f1';
const matrixName = 'mvpMatrix';

const en = torus(32, 32, 1.0, 2.0);
const setting: IRenderObjectSetting = {
  vbo: [
    {
      name: 'position',
      data: en.position,
      size: 3,
    },
    {
      name: 'color',
      data: en.color,
      size: 4,
    },
  ],
  ibo: en.index,
};


const GLClass = CanvasManager.createCanvas(600, 600, 'root');
GLClass.createShader(vertexSource, vertexName, SHADER_TYPE.VERTEX);
GLClass.createShader(fragmentSource, fragmentName, SHADER_TYPE.FRAGMENT);
// const program = GlClass.createProgram(vertex, fragment);

const matrix = new Matrix4(
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 3,
);
export default () => {
  GLClass.createProgram(vertexName, fragmentName);
  GLClass.initialRendering(setting, matrixName);
  const iboLength = setting.ibo.length;
  console.log(JSON.stringify(setting.vbo[0].data));
  console.log(setting.ibo);

  let i = 0;
  const main = () => {
    i += 0.001;
    GLClass.initialize();

    let matrixValue = matrix;
    matrixValue = matrixValue.rotateX(i * 10);
    matrixValue = matrixValue.rotateY(i / 10);

    GLClass.render(matrixValue.values, iboLength);
    GLClass.flush();
    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
  };
  main();
};
