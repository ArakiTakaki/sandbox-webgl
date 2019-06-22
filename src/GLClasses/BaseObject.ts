import {
  IVBOSetting,
  IIBOSetting,
  IUniLocation,
} from '../constants/interfaces';
import Errors from '../util/Errors';

export default class BaseObject {
  private vbo: Map<string, IVBOSetting>;

  private ibo?: IIBOSetting;

  private uniLocaiton: Map<string, IUniLocation>;

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

  bindVBOLocation(name: string, location: number) {
    const vbo = this.vbo.get(name);
    if (vbo == null) return;
    vbo.location = location;
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

  bindUniLocation(name: string, location: number) {
    const uniLocation = this.uniLocaiton.get(name);
    if (uniLocation == null) throw Errors.nullPointer('nofound unilocation');
    uniLocation.bind = location;
    this.uniLocaiton.set(name, uniLocation);
  }

  getUniLocationMap(): Map<string, IUniLocation> {
    return this.uniLocaiton;
  }
}
