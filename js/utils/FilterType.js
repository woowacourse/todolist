import { TEXT_TYPE } from '../utils/Constants.js';

class Filter {
    constructor(name, content, { filter }) {
        this.name = name;
        this.content = content;
        this.filter = filter;
    }

    filter(items) {
        return this.filter(items);
    }

    equals(that) {
        return Object.is(this, that);
    }

    href() {
        return Object.is(this.name, 'all') ? TEXT_TYPE.EMPTY : this.name;
    }
}

const FilterType = Object.freeze({
    ALL: new Filter('all', '전체보기', { filter: (items) => items }),
    ACTIVE: new Filter('active', '해야할 일', { filter: (items) => items.filter((item) => item.isNotCompleted()) }),
    COMPLETED: new Filter('completed', '완료한 일', { filter: (items) => items.filter((item) => item.isCompleted()) }),
});

export default FilterType;
