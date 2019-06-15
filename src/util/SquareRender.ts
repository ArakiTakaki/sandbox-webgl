/* eslint-disable no-bitwise */
// import vertexSource from '../shader/fragment.glsl';
// import fragmentSource from '../shader/fragment.glsl';
import { Matrix4 } from 'matrixgl';
import CanvasManager from '../core/CanvasManager';
import { IRenderObjectSetting } from '../constants/interfaces';
import { SHADER_TYPE } from '../core/WebGLClass';

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

const GLClass = CanvasManager.createCanvas(600, 600, 'root');
GLClass.createShader(vertexSource, vertexName, SHADER_TYPE.VERTEX);
GLClass.createShader(fragmentSource, fragmentName, SHADER_TYPE.FRAGMENT);
// const program = GlClass.createProgram(vertex, fragment);
const setting: IRenderObjectSetting = {
  vbo: [
    {
      name: 'position',
      data: [
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        0.0, -1.0, 0.0,
      ],
      size: 3,
    },
    {
      name: 'color',
      data: [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,
      ],
      size: 4,
    },
  ],
  ibo: [
    0, 1, 2,
    1, 2, 3,
  ],
};


const matrix = new Matrix4(
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 3,
);
const matrixName = 'mvpMatrix';
export default () => {
  GLClass.createProgram(vertexName, fragmentName);
  GLClass.initialRendering(setting, matrixName);
  const iboLength = setting.ibo.length;

  let i = 0;
  const main = () => {
    i += 0.01;
    GLClass.initialize();

    let matrixValue = matrix;
    matrixValue = matrixValue.rotateX(i * 10);
    matrixValue = matrixValue.rotateY(i);
    matrixValue = matrixValue.rotateY(i / 10);

    GLClass.render(matrixValue.values, iboLength);
    GLClass.flush();
    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
  };
  main();
};
