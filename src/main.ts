/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import { Float32Vector2 } from 'matrixgl';
import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
import { BUFFER_TYPE } from './constants/interfaces';
import BaseController from './lib/GLCLass/BaseController';
import BaseObject from './lib/GLCLass/BaseObject';
import BaseGLClass from './lib/GLCLass/BaseGLClass';

const CanvasID = 'canvas';

const GLClass = new BaseGLClass(600, 600, CanvasID);

const square = new BaseObject('square');
const POSITION = 'position';
const MVP_MATRIX = 'mvpMatrix';
square.addVBO(POSITION, {
  name: POSITION,
  data: [
    1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
  ],
  vboLocation: -1,
  size: 3,
});

square.setIBO([
  0, 1, 2,
  1, 3, 2,
]);

const MOUSE = 'mouse';
const mouseLocation = new Float32Vector2(0.1, 0.1);
// const mvpMatrix = Matrix4.identity();
// square.addUniLocation({
//   name: MVP_MATRIX,
//   uniLocation: mvpMatrix,
//   bind: null,
// });
square.addUniLocation({
  name: MOUSE,
  uniLocation: mouseLocation,
  bind: null,
});

BaseController.init(CanvasID);
BaseController.setMouseEvent(vec2 => {
  mouseLocation.x = (vec2.x + 1) / 2;
  mouseLocation.y = (vec2.y + 1) / 2;
});

const main = () => {
  const { gl } = GLClass;
  GLClass.createProgram(vertex, fragment);

  const position = square.getVBO(POSITION);
  const ibo = square.getIBO();
  if (position == null || ibo == null) return;

  const iboBuffer = GLClass.createBuffer(ibo.data, BUFFER_TYPE.IBO);
  const location = GLClass.getAttribLocation(POSITION);

  const mouseLI = GLClass.getUniLocation(MOUSE);
  // const mvpMatrixLI = GLClass.getUniLocation(MVP_MATRIX);
  if (mouseLI == null) return;

  ibo.buffer = iboBuffer;
  square.bindVBOLocation(POSITION, location);
  position.buffer = GLClass.createBuffer(position.data, BUFFER_TYPE.VBO);

  square.bindUniLocation(MOUSE, mouseLI);
  // square.bindUniLocation(MVP_MATRIX, mvpMatrixLI);

  const vboSquare = square.getVBOMap();
  const uniLocationSquare = square.getUniLocationMap();
  const iboSquare = square.getIBO();
  if (iboSquare == null) return;

  const render = () => {
    GLClass.preRenderObject();
    GLClass.renderObject(vboSquare, uniLocationSquare, iboSquare);
    GLClass.flush();
    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(render);
  };
  render();
};

main();
