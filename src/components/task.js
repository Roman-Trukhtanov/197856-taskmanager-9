import {CARD_COLORS} from "../variables";

export const getTaskItem = (color, text, hashTags, date, time, isRepeat = false, isDeadline = false) => {
  let hashTagItemsLayout = ``;

  for (const item of hashTags) {
    const hashTag = `<span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${item}
      </span>
    </span>`;

    hashTagItemsLayout += hashTag;
  }

  return `<article class="card ${CARD_COLORS[color]}${isRepeat ? ` card--repeat` : ``}${isDeadline ? ` card--deadline` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${text}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time">${time}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${hashTagItemsLayout}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
};
