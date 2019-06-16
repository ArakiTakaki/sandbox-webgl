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

  const invMatrix = GLClass.findUniLocation('invMatrix');
  if (invMatrix == null) throw Error('null');
  const invMatrixLocation = new Matrix4x4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 5,
  );

  const mvpMatrix = GLClass.findUniLocation('mvpMatrix');
  if (mvpMatrix == null) throw Error('null');
  const mvpMatrixLocation = new Matrix4x4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 5,
  );

  const lightDirection = GLClass.findUniLocation('lightDirection');
  if (lightDirection == null) throw Error('null');
  const lightDirectionL = [-0.5, 0.8, 0.5];

  const ambientColor = GLClass.findUniLocation('ambientColor');
  if (ambientColor == null) throw Error('null');
  const ambientColorL = [0.1, 0.0, 0.0, 1.0];

  const eyeDirection = GLClass.findUniLocation('eyeDirection');
  if (eyeDirection == null) throw Error('null');
  const eyeDirectionL = [0.0, 0.0, 20.0];

  let i = 0;
  const invMatrixL = invMatrixLocation;
  GLClass.setLocation(invMatrix, invMatrixL.values, UNIFORM_TYPE.MAT4);
  GLClass.setLocation(ambientColor, ambientColorL, UNIFORM_TYPE.VEC4);
  GLClass.setLocation(lightDirection, lightDirectionL, UNIFORM_TYPE.VEC3);
  GLClass.setLocation(eyeDirection, eyeDirectionL, UNIFORM_TYPE.VEC3);
  const main = () => {
    i += 0.001;
    GLClass.initialize();

    const mvpMatrixL = mvpMatrixLocation.rotateX(30).rotateZ(i * 50);
    GLClass.setLocation(mvpMatrix, mvpMatrixL.values, UNIFORM_TYPE.MAT4);

    GLClass.render(iboLength);

    GLClass.flush();
    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
    // setTimeout(main, 60);
  };
  main();
};
