import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html/lib/lit-extended.js';

export class LitForm extends LitElement {
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
          display: block;
        }

        input {
          width: 50px;
        }
      </style>
      <label>
        Rows:
        <input type="number" value$="${rows}" on-input="${this.__onRowsInput.bind(this)}">
      </label>
      <label>
        Cols:
        <input type="number" value$="${cols}" on-input="${this.__onColsInput.bind(this)}">
      </label>
    `;
  }

  __onRowsInput(event) {
    let value = Number(event.target.value);
    value = value > 100 ? 100 : value;
    this.dispatchEvent(new CustomEvent('rows-changed', { detail: { value } }));
  }

  __onColsInput(event) {
    let value = Number(event.target.value);
    value = value > 100 ? 100 : value;
    this.dispatchEvent(new CustomEvent('cols-changed', { detail: { value } }));
  }
}

customElements.define('lit-form', LitForm);
