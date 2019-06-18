/* eslint-disable no-bitwise */
import { Matrix4x4, Float32Vector2 } from 'matrixgl';
import CanvasManager from '../core/CanvasManager';
import { SHADER_TYPE } from '../constants/interfaces';
import BaseObject from '../GLClasses/BaseObject';
import vertexConstants from '../shader/vertexConstants';
import fragmentConstants from '../shader/fragmentConstants';

const vertexName = 'v1';
const fragmentName = 'f1';

let mouseX = 50;
let mouseY = 0;
// eslint-disable-next-line no-undef
const { innerWidth, innerHeight } = window;
// eslint-disable-next-line no-undef
document.addEventListener('mousemove', (e: MouseEvent) => {
  mouseX = (e.x / innerHeight + 0.1) * 50;
  // mouseY = e.y / innerWidth;
});

let attouch = 0;
let asdf = 1;
setInterval(() => {
  asdf += 1;
  attouch = Math.sin(asdf / 100);
  mouseY = attouch * 0.5;
},10)

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

    const jLen = 3s;
    for (let j = 0; j < jLen; j += 1) {
      const f = Circle1.getUniLocation(MVP_MATRIX);
      GLClass.updateRendering(Circle1);
      const location = f.location as Matrix4x4;
      GLClass.initLocation({
        ...f,
        location: location.rotateX(40).rotateY(-i / 50 + j / (jLen / 6.3)).translate(0, 0, -1.5),
      });

      const mouse = Circle1.getUniLocation(fragmentConstants.UNIFORMS.MOUSE);
      const mouseLocation = mouse.location as Float32Vector2;
      mouseLocation.x = mouseX;
      mouseLocation.y = mouseY;
      GLClass.initLocation({
        ...mouse,
        location: mouseLocation,
      });

      GLClass.render(Circle1.getIBODataLength());
    }
    GLClass.flush();

    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(main);
  };
  main();
};
