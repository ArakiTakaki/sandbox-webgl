import Matrix from '../util/Matrix';

export interface IVBOSetting {
  name: string;
  data: number[];
  size: number;
  matrixList?: Matrix[];
}

export interface IRenderObjectSetting {
  vbo: IVBOSetting[];
  ibo: number[]
}

export default 'test';
