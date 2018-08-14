import { RefCell } from './ref-cell.js';

const textStyleMixin = {
  ':hover': {
    backgroundColor: 'red',
  },
};

export class RefCellHighlighted extends RefCell {
  _render(props) {
    this._mixStyle(props, { textStyleMixin });
    return super._render(...arguments);
  }
}

customElements.define('ref-cell-highlighted', RefCellHighlighted);
