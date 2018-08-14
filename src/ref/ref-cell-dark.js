import { RefCellHighlighted } from './ref-cell-highlighted.js';

const hostStyleMixin = {
  backgroundColor: 'darkgrey',
};

const textStyleMixin = {
  color: 'white',
  textAlign: 'left',
  ':hover': {
    textAlign: 'right',
  },
};

export class RefCellDark extends RefCellHighlighted {
  _renderHost(props) {
    this._mixStyle(props, { hostStyleMixin });
    return super._renderHost(...arguments);
  }

  _render(props) {
    this._mixStyle(props, { textStyleMixin });
    return super._render(...arguments);
  }
}

customElements.define('ref-cell-dark', RefCellDark);
