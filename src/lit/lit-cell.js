import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html/lib/lit-extended.js';

export class LitCell extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
      col: Number,
    };
  }

  _renderStyle() {
    return `
      :host {
        display: inline-block;
        font-size: 18px;
      }
    `;
  }

  _render({ rows, cols, row, col }) {
    const max = Math.max(rows, cols);
    const size = max <= 20 ? '4vw' : `${80/max}vw`;
    this.style.width = size;
    this.style.height = size;
    return html`
      <style>
        ${this._renderStyle()}
      </style>
      ${row+1}:${col+1}
    `;
  }
}

customElements.define('lit-cell', LitCell);
