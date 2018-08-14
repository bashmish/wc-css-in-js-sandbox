import { LitCell } from './lit-cell.js';

export class LitCellDark extends LitCell {
  _renderStyle() {
    return `
      ${super._renderStyle()}
      :host {
        background-color: darkgrey;
      }
    `;
  }
}

customElements.define('lit-cell-dark', LitCellDark);
