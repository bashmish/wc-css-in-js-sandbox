import { RefCellHighlighted } from './ref-cell-highlighted.js';

const hostStyleMixin = {
  'background-color': 'darkgrey',
};

const textStyleMixin = {
  'color': 'white',
  'text-align': 'left',
  ':hover': {
    'text-align': 'right',
  },
};

export class RefCellDark extends RefCellHighlighted {
  renderHostAttributes(...args) {
    this._mixStyle({ hostStyleMixin });
    return super.renderHostAttributes(...args);
  }

  render(...args) {
    this._mixStyle({ textStyleMixin });
    return super.render(...args);
  }
}

customElements.define('ref-cell-dark', RefCellDark);
