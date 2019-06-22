/* eslint-disable no-unused-expressions */
import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
import BaseGLClass from './GLClasses/BaseGLClass';
import BaseObject from './GLClasses/BaseObject';
import { BUFFER_TYPE } from './constants/interfaces';

const GLClass = new BaseGLClass(600, 600, 'canvas');

const square = new BaseObject('square');
square.addVBO('position', {
  name: 'position',
  data: [
    1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
  ],
  location: -1,
  size: 3,
});

square.setIBO([
  0, 1, 2,
  1, 3, 2,
]);

const POSITION = 'position';
const main = () => {
  const { gl } = GLClass;
  GLClass.createProgram(vertex, fragment);

  const position = square.getVBO(POSITION);
  const ibo = square.getIBO();
  if (position == null || ibo == null) return;

  const iboBuffer = GLClass.createBuffer(ibo.data, BUFFER_TYPE.IBO);
  const location = GLClass.getAttribLocation(POSITION);

  ibo.buffer = iboBuffer;
  square.bindVBOLocation(POSITION, location);
  position.buffer = GLClass.createBuffer(position.data, BUFFER_TYPE.VBO);

  GLClass.preRenderObject();
  GLClass.setAttribute(position.buffer, position.size, position.location);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo.buffer);
  gl.drawElements(gl.TRIANGLES, ibo.data.length, gl.UNSIGNED_SHORT, 0);

  GLClass.flush();
};

main();
