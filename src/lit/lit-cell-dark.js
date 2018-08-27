import { LitCellHighlighted } from './lit-cell-highlighted.js';

export class LitCellDark extends LitCellHighlighted {
  _renderStyle() {
    return /*css*/`
      ${super._renderStyle()}
      :host {
        background-color: darkgrey;
      }

      .text {
        color: white;
        text-align: left;
      }

      .text:hover {
        text-align: right;
      }
    `;
  }
}

customElements.define('lit-cell-dark', LitCellDark);
