import { LitElement, html, createStaticStyle } from '../lit-element/lit-element.js';
import '../lit-form/lit-form.js';
import '../lit-table/lit-table.js';

const hostClass = createStaticStyle({
  display: 'block',
});

export class LitApp extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
    };
  }

  constructor() {
    super();
    this.rows = 8;
    this.cols = 8;
  }

  _renderHost() {
    return {
      class: hostClass,
    };
  }

  _render({ rows, cols }) {
    return html`
      <lit-form
        rows="${rows}"
        cols="${cols}"
        on-rows-changed="${this.__onRowsChanged.bind(this)}"
        on-cols-changed="${this.__onColsChanged.bind(this)}"
      ></lit-form>
      <div>
        <lit-table
          rows="${rows}"
          cols="${cols}"
        ></lit-table>
      </div>
    `;
  }

  __onRowsChanged(event) {
    this.rows = event.detail.value;
  }

  __onColsChanged(event) {
    this.cols = event.detail.value;
  }
}

customElements.define('lit-app', LitApp);
