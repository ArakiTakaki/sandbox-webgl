import WebGLClass from './WebGLClass';

interface ICanvasClass {
  id: string;
  instance: WebGLClass;
}
export default class CanvasManager {
  static canvasInstanceList: ICanvasClass[] = [];

  static createCanvas(width: number, height: number, id: string): WebGLClass {
    const tmp = CanvasManager.getCanvas(id);
    if (tmp != null) {
      return tmp;
    }
    const instance = new WebGLClass(width, height, id);
    CanvasManager.canvasInstanceList.push({
      id,
      instance,
    });
    return instance;
  }

  static getCanvas(id: string):WebGLClass | null {
    // eslint-disable-next-line max-len
    const instance = CanvasManager.canvasInstanceList.filter(canvasInstance => canvasInstance.id === id)[0];
    if (instance == null) {
      return null;
    }

    return instance.instance;
  }
}
