import { RefCell } from './ref-cell.js';

const textStyleMixin = {
  ':hover': {
    backgroundColor: 'red',
  },
};

export class RefCellHighlighted extends RefCell {
  render(...args) {
    this._mixStyle({ textStyleMixin });
    return super.render(...args);
  }
}

customElements.define('ref-cell-highlighted', RefCellHighlighted);
