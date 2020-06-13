import { EVENT_TYPE, TAG_NAME, TEXT_TYPE } from '../utils/Constants.js';
import FilterType from '../utils/FilterType.js';

const todoFilterTemplate = (filter, selected) => `
<li>
  <a class="${filter.name} ${selected ? 'selected' : ''}" href="#/${filter.href()}">${filter.content}</a>
</li>
`;

export default class TodoFilter {
    constructor(filter, { onChangeFilter }) {
        this.filters = document.querySelector('.filters');
        this.filters.addEventListener(EVENT_TYPE.CLICK, (event) => this.toggleFilter(event, onChangeFilter));
        this.render(filter);
    }

    toggleFilter(event, onChangeFilter) {
        const $target = event.target;
        if (!Object.is($target.tagName, TAG_NAME.A)) {
            return;
        }
        const filterType = Object.values(FilterType).find((filterType) => $target.classList.contains(filterType.name));
        if (Object.is(filterType, undefined)) {
            return;
        }
        onChangeFilter(filterType);
    }

    render(filter) {
        this.filters.innerHTML = Object.values(FilterType)
            .map((filterType) => todoFilterTemplate(filterType, filterType.equals(filter)))
            .join(TEXT_TYPE.EMPTY);
    }
}
