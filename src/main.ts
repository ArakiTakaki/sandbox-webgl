import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
import Industrial from './lib/Industrial';
import TorusObject from './objects/TorusObject';
// import Square2D from './objects/Square2D';
import Square3D from './objects/Square3D';

const torus = TorusObject();
// const square = Square2D();
const square3 = Square3D();

const CanvasID = 'sample';
Industrial([torus, square3], vertex, fragment, CanvasID);
