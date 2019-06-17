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

  const [Circle] = settings;
  GLClass.initialRendering(Circle);

  let i = 1;
  const { MVP_MATRIX } = vertexConstants.UNIFORMS;
  const main = () => {
    i += 1;
    GLClass.preRender();

    const f = Circle.getUniLocation(MVP_MATRIX);
    GLClass.updateRendering(Circle);
    const location = f.location as Matrix4x4;

    GLClass.initLocation({
      name: f.name,
      type: f.type,
      location: location.rotateX(i / 10).rotateZ(i / 100),
    });
    GLClass.render(Circle.getIBODataLength());
    GLClass.flush();

    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
  };
  main();
};
