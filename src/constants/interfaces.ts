import { Matrix4x4 } from 'matrixgl';
// eslint-disable-next-line import/no-cycle

export enum BUFFER_TYPE {
  VBO = 'vbo',
  IBO = 'ibo',
}

export enum SHADER_TYPE {
  VERTEX = 'vertex',
  FRAGMENT = 'fragment',
}

export enum UNIFORM_TYPE {
  FV3 = 'FV3',
  FV4 = 'FV4',
}
export interface IVBOSetting {
  name: string;
  data: number[];
  size: number;
}

export interface IRenderObjectSetting {
  vbo: IVBOSetting[];
  ibo: number[]
  uniLocations: IUniLocation[];
}

export interface IUniLocation {
  location: Matrix4x4 | number[];
  type: UNIFORM_TYPE;
  name: string;
}

export default 'test';
