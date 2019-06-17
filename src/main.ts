import fragmentSource from './shader/fragment.glsl';
import vertexSource from './shader/vertex.glsl';
import Render from './util/Render';
import circleObject from './obj.data';

Render([
  circleObject('circle1', 20, 20, 0.4, 0.8),
  circleObject('circle2k', 40, 40, 0.4, 0.8),
], vertexSource, fragmentSource);
