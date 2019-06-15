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

  let i = 0;
  const main = () => {
    i += 0.001;
    GLClass.initialize();

    const invMatrixL = invMatrixLocation.rotateX(i * 10).rotateY(i * 5).rotateZ(i * 15);
    GLClass.setLocation(invMatrix, invMatrixL.values, UNIFORM_TYPE.FV4);
    GLClass.setLocation(lightDirection, lightDirectionL, UNIFORM_TYPE.FV3);

    const mvpMatrixL = mvpMatrixLocation.rotateX(i * 10).rotateY(i * 5).rotateZ(i * 15);
    GLClass.setLocation(mvpMatrix, mvpMatrixL.values, UNIFORM_TYPE.FV4);
    GLClass.render(iboLength);
    GLClass.flush();
    // eslint-disable-next-line no-undef
    // window.requestAnimationFrame(main);
    setTimeout(main, 10);
  };
  main();
};
