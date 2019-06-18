import fragmentSource from './shader/fragment.glsl';
import vertexSource from './shader/vertex.glsl';
import Render from './util/Render';
import circleObject from './obj.data';
import enObject from './en.data';

Render([
  enObject('circle2', 50, 50, 2.0),
  // circleObject('circle1', 20, 20, 0.4, 0.8),
], vertexSource, fragmentSource);
