import { RefElement, html } from './ref-element.js';
import './ref-cell.js';

const hostStyle = {
  display: 'block',
  overflow: 'hidden',
};

const whiteOrBlackClass = (row, col) => (row + col) % 2 ? 'black' : 'white';

export class RefRow extends RefElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
    };
  }

  _renderHost({ cl }) {
    return {
      class: cl(hostStyle),
    };
  }

  _render({ rows, cols, row }) {
    return html`
      ${Array.from({ length: cols }).map((_, i) => html`<ref-cell
        rows="${rows}"
        cols="${cols}"
        row="${row}"
        col="${i}"
        class$="${whiteOrBlackClass(row, i)}"
      ></ref-cell>`)}
    `;
  }
}

customElements.define('ref-row', RefRow);
