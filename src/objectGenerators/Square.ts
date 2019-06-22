
export default (width: number, height: number, z: number) => ({
  position: [
    width, (height * -1), z,
    width, height, z,
    (width * -1), height, z,
    (width * -1), (height * -1), z,
  ],
  normal: [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ],
  color: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  index: [
    0, 1, 2,
    1, 2, 3,
  ],
});
