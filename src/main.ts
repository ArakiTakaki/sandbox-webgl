/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import { Float32Vector2, Matrix4 } from 'matrixgl';
import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
import BaseObject from './lib/GLCLass/BaseObject';
import Industrial from './lib/Industrial';

const square = new BaseObject('square');
const POSITION = 'position';
// const MVP_MATRIX = 'mvpMatrix';
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
const MVP_MATRIX = 'mvpMatrix';
const mouseLocation = new Float32Vector2(0.1, 0.1);
const mvpMatrix = Matrix4.identity().scale(0.9, 0.9, 1);
square.addUniLocation({
  name: MVP_MATRIX,
  uniLocation: mvpMatrix,
  bind: null,
});

square.addUniLocation({
  name: MOUSE,
  uniLocation: mouseLocation,
  bind: null,
});

const CanvasID = 'sample';
Industrial(square, vertex, fragment, CanvasID);
