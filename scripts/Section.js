class Section {
  constructor({ items, renderer }, addCardElements) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._containerCardElements = document.querySelector(addCardElements);
  }

  clear() {
    this._containerCardElements.innerHTML = "";
  }

  renderer() {
    this.clear();
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._containerCardElements.append(element);
  }
}

export default Section;
