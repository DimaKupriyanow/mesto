
export class Section {      // класс вставляет разметку в DOM
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {      // отрисовка всех елементов
    this._renderedItems.forEach((item) => {
        this._renderer(item);
    });
  }

  addItem(elem) {      // вставляем DOM елемент в контейнер
    this._container.prepend(elem);
  }
}