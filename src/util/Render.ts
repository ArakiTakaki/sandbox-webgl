/* eslint-disable no-bitwise */
import { Matrix4x4 } from 'matrixgl';
import CanvasManager from '../core/CanvasManager';
import { IRenderObjectSetting, UNIFORM_TYPE, SHADER_TYPE } from '../constants/interfaces';

const vertexName = 'v1';
const fragmentName = 'f1';

// const program = GlClass.createProgram(vertex, fragment);

export default (
  setting: IRenderObjectSetting,
  vertexSource: string,
  fragmentSource: string,
) => {
  const GLClass = CanvasManager.createCanvas(600, 600, 'root');
  GLClass.createShader(vertexSource, vertexName, SHADER_TYPE.VERTEX);
  GLClass.createShader(fragmentSource, fragmentName, SHADER_TYPE.FRAGMENT);

  GLClass.createProgram(vertexName, fragmentName);
  GLClass.initialRendering(setting, 'sampleIBO');
  const iboLength = setting.ibo.length;

  /* matrix */
  const invMatrix = GLClass.findUniLocation('invMatrix');
  if (invMatrix == null) throw Error('null');
  const invMatrixL = new Matrix4x4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 5,
  );
  GLClass.setLocation(invMatrix, invMatrixL.values, UNIFORM_TYPE.MAT4);

  const mvpMatrix = GLClass.findUniLocation('mvpMatrix');
  if (mvpMatrix == null) throw Error('null');
  const mvpMatrixL = new Matrix4x4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    1, 1, 1, 5,
  ).rotateX(20);
  GLClass.setLocation(mvpMatrix, mvpMatrixL.values, UNIFORM_TYPE.MAT4);

  // 光源
  const mMatrix = GLClass.findUniLocation('mMatrix');
  if (mMatrix == null) throw Error('null');
  const mMatrixL = new Matrix4x4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    10, 50, 10, 1,
  );
  GLClass.setLocation(mMatrix, mMatrixL.values, UNIFORM_TYPE.MAT4);

  const ambientColor = GLClass.findUniLocation('ambientColor');
  if (ambientColor == null) throw Error('null');
  const ambientColorL = [0.1, 0.0, 0.0, 1.0];
  GLClass.setLocation(ambientColor, ambientColorL, UNIFORM_TYPE.VEC4);

  const eyeDirection = GLClass.findUniLocation('eyeDirection');
  if (eyeDirection == null) throw Error('null');
  const eyeDirectionL = [0.0, 0.0, 20.0];
  GLClass.setLocation(eyeDirection, eyeDirectionL, UNIFORM_TYPE.VEC3);

  let i = 0;
  const main = () => {
    i += 0.001;
    GLClass.initialize();

    const mvpMatrixLoc = mvpMatrixL.rotateZ(i * 50);
    GLClass.setLocation(mvpMatrix, mvpMatrixLoc.values, UNIFORM_TYPE.MAT4);
    // const mMatrixLoc = mMatrixL.rotateZ(i * 100);
    // GLClass.setLocation(mMatrix, mMatrixLoc.values, UNIFORM_TYPE.MAT4);

    GLClass.render(iboLength);

    GLClass.flush();
    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
    // setTimeout(main, 60);
  };
  main();
};
