import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html/lib/lit-extended.js';
import './lit-row.js';

export class LitTable extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
    };
  }

  _render() {
    const { rows, cols } = this;
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      ${Array.from({ length: rows }).map((_, i) => {
        return html`<lit-row rows="${rows}" cols="${cols}" row="${i}"></lit-row>`;
      })}
    `;
  }
}

customElements.define('lit-table', LitTable);
