import { LitElement } from '@polymer/lit-element';
import { LitElementCssInJsMixin } from '../../packages/lit-element-css-in-js/LitElementCssInJsMixin.js';
import { html } from 'lit-html';

const hostStyle = {
  display: 'block',
};

const inputStyle = {
  width: '50px',
};

export class RefForm extends LitElementCssInJsMixin(LitElement) {
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
    const inputClass = this._renderClass(inputStyle);
    return html`
      <label>
        Rows:
        <input class="${inputClass}" type="number" value="${rows}" @input="${this.__onRowsInput.bind(this)}">
      </label>
      <label>
        Cols:
        <input class="${inputClass}" type="number" value="${cols}" @input="${this.__onColsInput.bind(this)}">
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

customElements.define('ref-form', RefForm);
