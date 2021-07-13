export class Stack<T> {
  private _list: T[] = [];

  public push(element: T) {
    this._list.push(element);
  }
  public pop(): T {
    const length = this.size;
    if (length === 0) {
      throw new Error("length is 0");
    }
    const head = this._list[length - 1];
    this._list = this._list.slice(0, length - 1);
    return head;
  }
  public clear() {
    this._list = [];
  }
  public toString(): string {
    return this._list.join("");
  }
  public indexOf(element: T) {
    return this._list.indexOf(element);
  }
  public get size() {
    return this._list.length;
  }
}
