import WebGLClass from './util/WebGLClass';
import Matrix from './util/Matrix';

const mtx = new Matrix(600, 600);
const gl2 = new WebGLClass(600, 600, 'sample', 3);
gl2.init();
console.log(mtx.square(300, 300));
// gl2.render(mtx.square(300, 300));
gl2.render([
  0.0, 1.0, 0.0,
  1.0, 0.0, 0.0,
  -1.0, 0.0, 0.0,
]);
