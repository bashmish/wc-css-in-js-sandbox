import { LitElement, html, createStaticStyle } from '../lit-element/lit-element.js';
import '../lit-row/lit-row.js';

const hostClass = createStaticStyle({
  display: 'inline-block',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'black',
});

export class LitTable extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
    };
  }

  _renderHost() {
    return {
      class: hostClass,
    };
  }

  _render({ rows, cols }) {
    return html`
      ${Array.from({ length: rows }).map((_, i) => {
        return html`<lit-row rows="${rows}" cols="${cols}" row="${i}"></lit-row>`;
      })}
    `;
  }
}

customElements.define('lit-table', LitTable);
