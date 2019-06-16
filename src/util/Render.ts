/* eslint-disable no-bitwise */
import CanvasManager from '../core/CanvasManager';
import { IRenderObjectSetting, SHADER_TYPE } from '../constants/interfaces';

const vertexName = 'v1';
const fragmentName = 'f1';

// const program = GlClass.createProgram(vertex, fragment);

export default (
  settings: IRenderObjectSetting[],
  vertexSource: string,
  fragmentSource: string,
) => {
  const GLClass = CanvasManager.createCanvas(600, 600, 'root');
  GLClass.createShader(vertexSource, vertexName, SHADER_TYPE.VERTEX);
  GLClass.createShader(fragmentSource, fragmentName, SHADER_TYPE.FRAGMENT);
  GLClass.createProgram(vertexName, fragmentName);

  const [circleSetting1, circleSetting2] = settings;
  GLClass.initialRendering(circleSetting1);
  GLClass.initialRendering(circleSetting2);

  const main = () => {
    GLClass.preRender();

    GLClass.updateRendering(circleSetting1);
    GLClass.render(circleSetting1.ibo.data.length);
    GLClass.updateRendering(circleSetting2);
    GLClass.render(circleSetting2.ibo.data.length);
    GLClass.flush();

    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
  };
  main();
};
