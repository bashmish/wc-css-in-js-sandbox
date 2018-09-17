import { RefCellHighlighted } from './ref-cell-highlighted.js';

const hostStyleMixin = {
  'background-color': 'lightgrey',
};

const textStyleMixin = {
  'color': 'black',
  'text-align': 'right',
  ':hover': {
    'text-align': 'left',
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
