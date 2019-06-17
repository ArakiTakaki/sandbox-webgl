import {
  Matrix4x4, Float32Vector3, Float32Vector2, Float32Vector4, Matrix3x3, Matrix2x2,
} from 'matrixgl';
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
  VEC2 = 'VEC2',
  VEC3 = 'VEC3',
  VEC4 = 'VEC4',
  MAT4 = 'MAT4',
}
export interface IVBOSetting {
  name: string;
  data: number[];
  size: number;
}

export interface IRenderObjectSetting {
  vbo: IVBOSetting[];
  ibo: IIBOSetting;
  uniLocations: IUniLocation[];
}

export interface IIBOSetting {
  name: string;
  data: number[];
}

export type TypeUniform =
  | Matrix4x4
  | Float32Vector2
  | Float32Vector3
  | Float32Vector4
  | Matrix3x3
  | Matrix2x2;

export interface IUniLocation {
  name: string;
  type: UNIFORM_TYPE;
  location: TypeUniform;
}

export interface ICacheShader {
  id: string;
  shader: WebGLShader;
}

export interface ICacheBuffer {
  id: string;
  buffer: WebGLBuffer;
}

export interface IAttribLocation {
  id: string;
  location: number;
}

export interface IUniLocationList {
  id: string;
  uniLocation: WebGLUniformLocation;
}

export default 'test';
