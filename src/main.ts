import Matrix from './util/Matrix';
import { IRenderObjectSetting } from './constants/interfaces';
import SquareRender from './util/SquareRender';

const setting: IRenderObjectSetting = {
  vbo: [
    {
      name: 'position',
      data: [
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
      ],
      matrixList: [
        new Matrix().scale(0, 0),
      ],
      size: 3,
    },
    {
      name: 'color',
      data: [
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        0.0, -1.0, 0.0,
      ],
      size: 4,
    },
  ],
  ibo: [
    0, 1, 2,
    // 1, 2, 3,
  ],
};

const main = () => {
  SquareRender(setting);
  // window.requestAnimationFrame(main);
};

main();
