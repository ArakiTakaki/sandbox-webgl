/* eslint-disable no-bitwise */
import { Matrix4x4 } from 'matrixgl';
import CanvasManager from '../core/CanvasManager';
import { IRenderObjectSetting } from '../constants/interfaces';
import { SHADER_TYPE } from '../core/WebGLClass';

const vertexName = 'v1';
const fragmentName = 'f1';

// const program = GlClass.createProgram(vertex, fragment);

const matrixName = 'mvpMatrix';

export default (
  setting: IRenderObjectSetting,
  matrix: Matrix4x4,
  vertexSource: string,
  fragmentSource: string,
) => {
  const GLClass = CanvasManager.createCanvas(600, 600, 'root');
  GLClass.createShader(vertexSource, vertexName, SHADER_TYPE.VERTEX);
  GLClass.createShader(fragmentSource, fragmentName, SHADER_TYPE.FRAGMENT);

  GLClass.createProgram(vertexName, fragmentName);
  GLClass.initialRendering(setting, matrixName);
  const iboLength = setting.ibo.length;

  let i = 0;
  const main = () => {
    i += 0.001;
    GLClass.initialize();

    let matrixValue = matrix;
    matrixValue = matrixValue.rotateX(i * 10);
    matrixValue = matrixValue.rotateY(i * 5);
    matrixValue = matrixValue.rotateZ(i * 15);

    GLClass.render(matrixValue.values, iboLength);
    GLClass.flush();
    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
  };
  main();
};
