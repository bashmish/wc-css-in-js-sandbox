import { LitElement, html, createStaticStyle } from '../lit-element/lit-element.js';

const hostClass = createStaticStyle({
  display: 'block',
});

const inputClass = createStaticStyle({
  width: '50px',
});

export class LitForm extends LitElement {
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
      <label>
        Rows:
        <input class$="${inputClass}" type="number" value="${rows}" on-input="${this.__onRowsInput.bind(this)}">
      </label>
      <label>
        Cols:
        <input class$="${inputClass}" type="number" value="${cols}" on-input="${this.__onColsInput.bind(this)}">
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
