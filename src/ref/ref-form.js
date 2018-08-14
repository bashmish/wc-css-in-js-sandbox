import { RefElement, html } from './ref-element.js';

const hostStyle = {
  display: 'block',
};

const inputStyle = {
  width: '50px',
};

export class RefForm extends RefElement {
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

  _render({ rows, cols, cl }) {
    const inputClass = cl(inputStyle);
    return html`
      <label>
        Rows:
        <input class$="${inputClass}" type="number" value$="${rows}" on-input="${this.__onRowsInput.bind(this)}">
      </label>
      <label>
        Cols:
        <input class$="${inputClass}" type="number" value$="${cols}" on-input="${this.__onColsInput.bind(this)}">
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
