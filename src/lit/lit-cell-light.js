import { LitCell } from './lit-cell.js';

export class LitCellLight extends LitCell {
  _renderStyle() {
    return `
      ${super._renderStyle()}
      :host {
        background-color: lightgrey;
      }
    `;
  }
}

customElements.define('lit-cell-light', LitCellLight);
