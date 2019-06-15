// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/no-duplicates
// import vertexSource from '../shader/fragment.glsl';
// // eslint-disable-next-line import/no-duplicates
// import fragmentSource from '../shader/fragment.glsl';

import CanvasManager from '../core/CanvasManager';
import { IRenderObjectSetting } from '../constants/interfaces';
import { SHADER_TYPE } from '../core/WebGLClass';
import Matrix from './Matrix';

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

const GLClass = CanvasManager.createCanvas(600, 600, 'root');
GLClass.createShader(vertexSource, vertexName, SHADER_TYPE.VERTEX);
GLClass.createShader(fragmentSource, fragmentName, SHADER_TYPE.FRAGMENT);
// const program = GlClass.createProgram(vertex, fragment);

const matrix = new Matrix();
export default (setting: IRenderObjectSetting) => {
  GLClass.createProgram(vertexName, fragmentName);
  GLClass.initialRendering(setting, matrixName);
  const iboLength = setting.ibo.length;
  const mtx = matrix.create();
  GLClass.render(mtx, iboLength);
};
