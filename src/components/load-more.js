import AbstractComponent from "./abstract-component";

export default class LoadMore extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
