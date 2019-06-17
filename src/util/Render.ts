/* eslint-disable no-bitwise */
import { Matrix4x4 } from 'matrixgl';
import CanvasManager from '../core/CanvasManager';
import { SHADER_TYPE } from '../constants/interfaces';
import BaseObject from '../GLClasses/BaseObject';
import vertexConstants from '../shader/vertexConstants';

const vertexName = 'v1';
const fragmentName = 'f1';

// const program = GlClass.createProgram(vertex, fragment);

export default (
  settings: BaseObject[],
  vertexSource: string,
  fragmentSource: string,
) => {
  const GLClass = CanvasManager.createCanvas(600, 600, 'root');
  GLClass.createShader(vertexSource, vertexName, SHADER_TYPE.VERTEX);
  GLClass.createShader(fragmentSource, fragmentName, SHADER_TYPE.FRAGMENT);
  GLClass.createProgram(vertexName, fragmentName);

  const [Circle1] = settings;
  GLClass.initialRendering(Circle1);

  let i = 1;
  const { MVP_MATRIX } = vertexConstants.UNIFORMS;
  const main = () => {
    i += 1;
    GLClass.preRender();

    const jLen = 5;
    for (let j = 0; j < jLen; j += 1) {
      const f = Circle1.getUniLocation(MVP_MATRIX);
      GLClass.updateRendering(Circle1);
      const location = f.location as Matrix4x4;
      GLClass.initLocation({
        ...f,
        location: location.rotateX(40).rotateY(-i / 50 + j / (jLen / 6.3)).translate(0, 0, -1.5),
      });
      GLClass.render(Circle1.getIBODataLength());
    }
    GLClass.flush();

    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
  };
  main();
};
