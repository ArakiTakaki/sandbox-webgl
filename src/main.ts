import WebGLClass from './util/WebGLClass';
import Matrix from './util/Matrix';

const width = 600;
const height = 600;

Matrix.setWidth(width);
Matrix.setHeight(height);

const gl2 = new WebGLClass(width, height, 'sample');
gl2.init();

gl2.render([
  0.0, 1.0, 0.0,
  1.0, -1.0, 0.0,
  -1.0, -1.0, 0.0,
]);
gl2.flush();

// let i = 0.01;
// setInterval(() => {
//   i += 0.01;
//   gl2.render([
//     -0.5, i, 0.0,
//     -1.0, -0.9, 0.0,
//     i, -0.9, 0.0,
//   ]);
//   gl2.flush();
// }, 25);
