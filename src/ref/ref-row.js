import { LitElement } from '@polymer/lit-element';
import { LitElementCssInJsMixin } from '../../packages/lit-element-css-in-js/LitElementCssInJsMixin.js';
import { html } from 'lit-html';
import './ref-cell-dark.js';
import './ref-cell-light.js';

const hostStyle = {
  display: 'block',
  overflow: 'hidden',
};

export class RefRow extends LitElementCssInJsMixin(LitElement) {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
    };
  }

  renderHostAttributes() {
    return {
      class: this._renderHostAttributesClass(hostStyle),
    };
  }

  render() {
    const { rows, cols, row } = this;
    return html`
      ${Array.from({ length: cols }).map((_, col) => {
        if ((row + col) % 2) {
          return html`<ref-cell-dark .rows="${rows}" .cols="${cols}" .row="${row}" .col="${col}"></ref-cell-dark>`;
        } else {
          return html`<ref-cell-light .rows="${rows}" .cols="${cols}" .row="${row}" .col="${col}"></ref-cell-light>`;
        }
      })}
    `;
  }
}

customElements.define('ref-row', RefRow);
