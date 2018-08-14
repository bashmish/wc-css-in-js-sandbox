import { RefCell } from './ref-cell.js';

const hostStyle = {
  backgroundColor: 'darkgrey',
};

export class RefCellDark extends RefCell {
  _renderHost({ cl }) {
    const superHost = super._renderHost(...arguments);
    return {
      class: `${cl(hostStyle)} ${superHost.class}`,
    };
  }
}

customElements.define('ref-cell-dark', RefCellDark);
