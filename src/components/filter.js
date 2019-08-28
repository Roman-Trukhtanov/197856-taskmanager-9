import AbstractComponent from "./abstract-component";

export default class Filter extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="main__filter filter container"></section>`;
  }
}
