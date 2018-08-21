import { LitElement } from '@polymer/lit-element';
import { LitElementCssInJsMixin } from './LitElementCssInJsMixin.js';
import { html } from 'lit-html/lib/lit-extended.js';
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

  _renderHostAttributes({ cl }) {
    return {
      class: cl(hostStyle),
    };
  }

  _render({ rows, cols }) {
    return html`
      ${Array.from({ length: rows }).map((_, i) => {
        return html`<ref-row rows="${rows}" cols="${cols}" row="${i}"></ref-row>`;
      })}
    `;
  }
}

customElements.define('ref-table', RefTable);
