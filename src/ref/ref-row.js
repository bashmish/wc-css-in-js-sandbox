import { RefElement, html } from './ref-element.js';
import './ref-cell-dark.js';
import './ref-cell-light.js';

const hostStyle = {
  display: 'block',
  overflow: 'hidden',
};

export class RefRow extends RefElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
    };
  }

  _renderHostAttributes({ cl }) {
    return {
      class: cl(hostStyle),
    };
  }

  _render({ rows, cols, row }) {
    return html`
      ${Array.from({ length: cols }).map((_, col) => {
        if ((row + col) % 2) {
          return html`<ref-cell-dark rows="${rows}" cols="${cols}" row="${row}" col="${col}"></ref-cell-dark>`;
        } else {
          return html`<ref-cell-light rows="${rows}" cols="${cols}" row="${row}" col="${col}"></ref-cell-light>`;
        }
      })}
    `;
  }
}

customElements.define('ref-row', RefRow);
