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
  _renderHost(props) {
    this._mixStyle(props, { hostStyleMixin });
    return super._renderHost(...arguments);
  }

  _render(props) {
    this._mixStyle(props, { textStyleMixin });
    return super._render(...arguments);
  }
}

customElements.define('ref-cell-light', RefCellLight);
