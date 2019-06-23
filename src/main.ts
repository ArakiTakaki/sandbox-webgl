import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
import Industrial from './lib/Industrial';
import TorusObject from './objects/TorusObject';
import Square2D from './objects/Square2D';

const torus = TorusObject();
const square = Square2D();

const CanvasID = 'sample';
Industrial([square, torus], vertex, fragment, CanvasID);
