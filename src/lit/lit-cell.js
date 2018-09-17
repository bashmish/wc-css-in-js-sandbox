import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html';

export class LitCell extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
      col: Number,
    };
  }

  renderStyle() {
    const { rows, cols, row, col } = this;
    const chess = cols === 8 && rows === 8;
    const max = Math.max(rows, cols);
    const size = max <= 20 ? '4vw' : `${80/max}vw`;
    return /*css*/`
      :host {
        width: ${size};
        height: ${size};
        border-top-width: 1px;
        border-right-width: ${col === cols - 1 ? '1px' : '0px'};
        border-bottom-width: ${row === rows - 1 ? '1px' : '0px'};
        border-left-width: 1px;
        border-style: solid;
        border-color: ${chess ? 'black' : 'red'};
        display: inline-block;
        font-size: 18px;
      }

      .text {
        line-height: ${size};
        color: black;
      }
    `;
  }

  render() {
    const { row, col } = this;
    return html`
      <style>
        ${this.renderStyle()}
      </style>
      <div class="text">${row+1}:${col+1}</div>
    `;
  }
}

customElements.define('lit-cell', LitCell);
