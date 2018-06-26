import { LitElement, html, createStaticStyle } from '../lit-element/lit-element.js';
import '../lit-cell/lit-cell.js';

const hostClass = createStaticStyle({
  display: 'block',
  overflow: 'hidden',
});

const whiteOrBlackClass = (row, col) => (row + col) % 2 ? 'black' : 'white';

export class LitRow extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
    };
  }

  _renderHost() {
    return {
      class: hostClass,
    };
  }

  _render({ rows, cols, row }) {
    return html`
      ${Array.from({ length: cols }).map((_, i) => html`<lit-cell
        rows="${rows}"
        cols="${cols}"
        row="${row}"
        col="${i}"
        class$="${whiteOrBlackClass(row, i)}"
      ></lit-cell>`)}
    `;
  }
}

customElements.define('lit-row', LitRow);
