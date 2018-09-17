import { LitCell } from './lit-cell.js';

export class LitCellHighlighted extends LitCell {
  renderStyle() {
    return /*css*/`
      ${super.renderStyle()}
      .text:hover {
        background-color: red;
      }
    `;
  }
}

customElements.define('lit-cell-highlighted', LitCellHighlighted);
