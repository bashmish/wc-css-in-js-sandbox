import { LitCell } from './lit-cell.js';

export class LitCellHighlighted extends LitCell {
  _renderStyle() {
    return /*css*/`
      ${super._renderStyle()}
      .text:hover {
        background-color: red;
      }
    `;
  }
}

customElements.define('lit-cell-highlighted', LitCellHighlighted);
