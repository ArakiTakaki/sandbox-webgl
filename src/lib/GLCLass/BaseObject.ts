import {
  IVBOSetting,
  IIBOSetting,
  IUniLocation,
  IUnilocationMap,
  // eslint-disable-next-line import/named
  IVBOMap,
} from '../../constants/interfaces';
import Errors from '../../util/Errors';

export default class BaseObject {
  public vbo: IVBOMap;

  public ibo?: IIBOSetting;

  public uniLocaiton: IUnilocationMap;

  private iboDataLength = 0;

  public name: string;

  constructor(name: string) {
    this.vbo = new Map();
    this.uniLocaiton = new Map();
    this.name = name;
  }

  addVBO(name: string, vbo: IVBOSetting) {
    this.vbo.set(name, vbo);
  }

  setIBO(ibo: number[]) {
    this.ibo = {
      name: this.name,
      data: ibo,
    };
    this.iboDataLength = ibo.length;
  }

  bindIBOBuffer(buffer: WebGLBuffer) {
    if (this.ibo == null) {
      return;
    }
    this.ibo.buffer = buffer;
  }

  getVBOMap() {
    return this.vbo;
  }

  bindVBOLocation(name: string, vboLocation: number) {
    const vbo = this.vbo.get(name);
    if (vbo == null) return;
    vbo.vboLocation = vboLocation;
  }

  getVBO(name: string): IVBOSetting | undefined {
    return this.vbo.get(name);
  }

  bindVBOBuffer(name: string, buffer: WebGLBuffer) {
    const vbo = this.vbo.get(name);
    if (vbo == null) throw Errors.nullPointer('vbo notfound');
    vbo.buffer = buffer;
  }

  getIBODataLength() {
    return this.iboDataLength;
  }

  getIBO() {
    return this.ibo;
  }

  /**
   * @param location
   * @returns - uni locationのIndex
   */
  addUniLocation(location: IUniLocation) {
    this.uniLocaiton.set(location.name, location);
  }

  bindUniLocation(name: string, location: WebGLUniformLocation) {
    const uniLocation = this.uniLocaiton.get(name);
    if (uniLocation == null) throw Errors.nullPointer('nofound unilocation');
    uniLocation.bind = location;
  }

  getUniLocationMap() {
    return this.uniLocaiton;
  }
}
