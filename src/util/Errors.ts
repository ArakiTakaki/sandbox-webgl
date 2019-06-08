export default class Errors {
  public static nullPointer(message: string) {
    return new Error(`NULL POINTER EXCEPTION for : ${message}`);
  }
}
