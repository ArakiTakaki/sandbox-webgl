import { Float32Vector2 } from 'matrixgl';

/* eslint-disable no-undef */
/* eslint-disable no-bitwise */

const canvasMousePosition = (x: number, y: number, width: number, height: number) => {
  const canvasX = x / width * 2 - 1;
  const canvasY = y / height * 2 - 1;
  return [canvasX, canvasY * -1];
};

export default class BaseController {
  public static element: HTMLCanvasElement;

  public static width: number = 1;

  public static height: number = 1;

  public static mousePosition: Float32Vector2;

  public static mouseMoveHandle: {(mouse: {x: number; y: number}): void} | null;

  public static init(canvas: string) {
    this.element = document.getElementById(canvas) as HTMLCanvasElement;
    // this.element.addEventListener('touchstart', this.touchStartEvent);
    // this.element.addEventListener('touchstart', this.touchMoveEvent);
    this.width = this.element.width;
    this.height = this.element.height;
    this.mousePosition = new Float32Vector2(0, 0);
  }

  public static setMouseEvent(event: {(mouse: Float32Vector2): void}) {
    this.element.addEventListener('mousemove', e => {
      const [x, y] = canvasMousePosition(e.offsetX, e.offsetY, this.width, this.height);
      this.mousePosition.x = x;
      this.mousePosition.y = y;
      event(this.mousePosition);
    });
  }

  private static mouseClick(e: MouseEvent) {
    const [x, y] = canvasMousePosition(e.offsetX, e.offsetY, this.width, this.height);
    this.mousePosition.x = x;
    this.mousePosition.y = y;
    return this.mousePosition;
  }

  public static touchStartEvent(e: TouchEvent) {
    console.log(e);
  }

  public static touchMoveEvent(e: TouchEvent) {
    console.log(e);
    // e.changedTouches[0].;
  }
}
