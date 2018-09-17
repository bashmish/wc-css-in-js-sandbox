import { LitElement } from '@polymer/lit-element';
import { LitElementCssInJsMixin } from '../../packages/lit-element-css-in-js/LitElementCssInJsMixin.js';
import { html } from 'lit-html';
import './ref-row.js';

const hostStyle = {
  display: 'inline-block',
};

export class RefTable extends LitElementCssInJsMixin(LitElement) {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
    };
  }

  renderHostAttributes() {
    return {
      class: this._renderHostAttributesClass(hostStyle),
    };
  }

  render() {
    const { rows, cols } = this;
    return html`
      ${Array.from({ length: rows }).map((_, i) => {
        return html`<ref-row .rows="${rows}" .cols="${cols}" .row="${i}"></ref-row>`;
      })}
    `;
  }
}

customElements.define('ref-table', RefTable);
