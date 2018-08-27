import { LitCellHighlighted } from './lit-cell-highlighted.js';

export class LitCellLight extends LitCellHighlighted {
  _renderStyle() {
    return /*css*/`
      ${super._renderStyle()}
      :host {
        background-color: lightgrey;
      }

      .text {
        color: black;
        text-align: right;
      }

      .text:hover {
        text-align: left;
      }
    `;
  }
}

customElements.define('lit-cell-light', LitCellLight);
