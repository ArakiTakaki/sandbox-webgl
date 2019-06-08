import TriangleRender from './util/TriangleRender';
import Matrix from './util/Matrix';
import { IGLAttributeSetting } from './constants/interfaces';

const setting: IGLAttributeSetting[] = [
  {
    name: 'color',
    data: [
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
    ],
    size: 4,
  },
  {
    name: 'position',
    data: [
      0.0, 1.0, 0.0,
      1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0,
    ],
    matrixList: [
      new Matrix().scale(0, 0),
      new Matrix().scale(-20, -20),
      new Matrix().scale(-40, -40),
      new Matrix().scale(-60, -60),
      new Matrix().scale(-80, -80),
      new Matrix().scale(-100, -100),
    ],
    size: 3,
  },
];

let i = 1;
let n = 2;
const main = () => {
  i += 1;
  const { matrixList } = setting[1];
  const { data } = setting[0];
  if (matrixList == null) {
    return;
  }
  data[0] -= n / 100;
  data[2] += n / 100;

  data[4] += n / 100;
  data[5] -= n / 100;

  data[9] += n / 100;
  data[10] -= n / 100;

  //   data[6] -= n / 200;
  //   data[] += n / 200;
  matrixList.forEach(matrix => {
    matrix.scale(n / 2, n / 2);
  });
  TriangleRender(setting);
  if (i >= 100) {
    i = 0;
    n *= -1;
  }
  window.requestAnimationFrame(main);
};

main();
