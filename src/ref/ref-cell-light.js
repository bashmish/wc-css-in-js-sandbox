import { RefCell } from './ref-cell.js';

const hostStyle = {
  backgroundColor: 'lightgrey',
};

export class RefCellLight extends RefCell {
  _renderHost({ cl }) {
    const superHost = super._renderHost(...arguments);
    return {
      class: `${cl(hostStyle)} ${superHost.class}`,
    };
  }
}

customElements.define('ref-cell-light', RefCellLight);
