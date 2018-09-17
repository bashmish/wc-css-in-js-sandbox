import { LitElement } from '@polymer/lit-element';
import { LitElementCssInJsMixin } from '../../packages/lit-element-css-in-js/LitElementCssInJsMixin.js';
import { html } from 'lit-html';

const getSizeFromMax = (max) => max <= 20 ? '4vw' : `${80/max}vw`;

const hostStyle = (el) => {
  const chess = el.cols === 8 && el.rows === 8;
  const max = Math.max(el.cols, el.rows);
  const size = getSizeFromMax(max);
  return {
    'width': size,
    'height': size,
    'border-top-width': '1px',
    'border-right-width': el.col === el.cols - 1 ? '1px' : '0',
    'border-bottom-width': el.row === el.rows - 1 ? '1px' : '0',
    'border-left-width': '1px',
    'border-style': 'solid',
    'border-color': chess ? 'black' : 'red',
    'display': 'inline-block',
    'font-size': '18px',
    ...el._getStyleMixin('hostStyleMixin'),
  };
};

const textStyle = (el) => {
  const max = Math.max(el.cols, el.rows);
  const size = getSizeFromMax(max);
  return {
    'line-height': size,
    'color': 'black',
    ...el._getStyleMixin('textStyleMixin'),
  };
};

export class RefCell extends LitElementCssInJsMixin(LitElement) {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
      col: Number,
    };
  }

  renderHostAttributes() {
    return {
      class: this._renderHostClass(hostStyle),
    };
  }

  render() {
    const { row, col } = this;
    return html`
      <div class="${this._renderChildClass(textStyle)}">${row+1}:${col+1}</div>
    `;
  }
}

customElements.define('ref-cell', RefCell);
