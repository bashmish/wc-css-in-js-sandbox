import { RefElement, html } from './ref-element.js';
import './ref-row.js';

const hostStyle = {
  display: 'inline-block',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'black',
};

export class RefTable extends RefElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
    };
  }

  _renderHost({ cl }) {
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
