import { Matrix4x4 } from 'matrixgl';
import SquareRender from './util/Render';
import { IRenderObjectSetting } from './constants/interfaces';
import Torus from './util/Torus';

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

const cercle = Torus(32, 32, 1.0, 2.0);
const setting: IRenderObjectSetting = {
  vbo: [
    {
      name: 'position',
      data: cercle.position,
      size: 3,
    },
    {
      name: 'color',
      data: cercle.color,
      size: 4,
    },
  ],
  ibo: cercle.index,
};

const matrix = new Matrix4x4(
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 5,
);
SquareRender(setting, matrix, vertexSource, fragmentSource);
