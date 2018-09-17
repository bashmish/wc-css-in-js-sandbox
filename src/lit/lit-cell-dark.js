import { LitCellHighlighted } from './lit-cell-highlighted.js';

export class LitCellDark extends LitCellHighlighted {
  renderStyle() {
    return /*css*/`
      ${super.renderStyle()}
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
