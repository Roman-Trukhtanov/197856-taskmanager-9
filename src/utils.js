export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`template`);
  newElement.innerHTML = template;
  const newElementContent = newElement.content;

  if (newElementContent.childElementCount === 1) {
    return newElementContent.firstChild;
  }

  return newElementContent;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const isEscKey = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

export const isTagLink = (evt) => evt.target.tagName === `A`;
