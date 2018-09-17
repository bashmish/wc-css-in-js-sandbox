import { RefCellHighlighted } from './ref-cell-highlighted.js';

const hostStyleMixin = {
  backgroundColor: 'lightgrey',
};

const textStyleMixin = {
  color: 'black',
  textAlign: 'right',
  ':hover': {
    textAlign: 'left',
  },
};

export class RefCellLight extends RefCellHighlighted {
  renderHostAttributes(...args) {
    this._mixStyle({ hostStyleMixin });
    return super.renderHostAttributes(...args);
  }

  render(...args) {
    this._mixStyle({ textStyleMixin });
    return super.render(...args);
  }
}

customElements.define('ref-cell-light', RefCellLight);
