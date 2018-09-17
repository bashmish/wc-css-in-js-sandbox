import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html';
import './lit-form.js';
import './lit-table.js';

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

  render() {
    const { rows, cols } = this;
    return html`
      <style>
        :host {
          display: block;
        }

        lit-form {
          position: fixed;
          top: 0;
          right: 0;
        }
      </style>
      <lit-form
        .rows="${rows}"
        .cols="${cols}"
        @rows-changed="${this.__onRowsChanged.bind(this)}"
        @cols-changed="${this.__onColsChanged.bind(this)}"
      ></lit-form>
      <div>
        <lit-table
          .rows="${rows}"
          .cols="${cols}"
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
