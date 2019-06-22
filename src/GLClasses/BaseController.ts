import { Float32Vector2 } from 'matrixgl';

/* eslint-disable no-undef */
/* eslint-disable no-bitwise */

export default class BaseGlobalController {
  public static element: HTMLCanvasElement;

  public static width: number = 1;

  public static height: number = 1;

  public static mousePosition: Float32Vector2;

  public static init(canvas: string) {
    this.element = document.getElementById(canvas) as HTMLCanvasElement;
    this.element.addEventListener('mousemove', this.mouseMoveEvent);
    this.element.addEventListener('click', this.mouseMoveEvent);
    this.element.addEventListener('touchstart', this.touchStartEvent);
    this.element.addEventListener('touchstart', this.touchMoveEvent);
    this.width = this.element.width;
    this.height = this.element.height;
    this.mousePosition = new Float32Vector2(0, 0);
  }

  public static mouseMoveEvent(e: MouseEvent) {
    const [x, y] = this.canvasMousePosition(e.offsetX, e.offsetY);
    this.mousePosition.x = x;
    this.mousePosition.y = y;
    return this.mousePosition;
  }

  public static click(e: MouseEvent) {
    const [x, y] = this.canvasMousePosition(e.offsetX, e.offsetY);
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

  private static canvasMousePosition(x: number, y: number) {
    const canvasX = x / this.width * 2 - 1;
    const canvasY = y / this.height * 2 - 1;
    return [canvasX, canvasY];
  }
}
