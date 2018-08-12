import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html/lib/lit-extended.js';
import './lit-cell.js';

const whiteOrBlackClass = (row, col) => (row + col) % 2 ? 'black' : 'white';

export class LitRow extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
    };
  }

  _render({ rows, cols, row }) {
    return html`
      <style>
        :host {
          display: block;
          overflow: hidden;
        }
      </style>
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
