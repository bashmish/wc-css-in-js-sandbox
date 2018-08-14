import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html/lib/lit-extended.js';
import './lit-cell-dark.js';
import './lit-cell-light.js';

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
      ${Array.from({ length: cols }).map((_, col) => {
        if ((row + col) % 2) {
          return html`<lit-cell-dark rows="${rows}" cols="${cols}" row="${row}" col="${col}"></lit-cell-dark>`;
        } else {
          return html`<lit-cell-light rows="${rows}" cols="${cols}" row="${row}" col="${col}"></lit-cell-light>`;
        }
      })}
    `;
  }
}

customElements.define('lit-row', LitRow);
