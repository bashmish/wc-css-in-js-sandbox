import { LitElement } from '@polymer/lit-element';
import { LitElementCssInJsMixin } from '../../packages/lit-element-css-in-js/LitElementCssInJsMixin.js';
import { html } from 'lit-html';

const getSizeFromMax = (max) => max <= 20 ? '4vw' : `${80/max}vw`;

const hostStyle = (el) => {
  const chess = el.cols === 8 && el.rows === 8;
  const max = Math.max(el.cols, el.rows);
  const size = getSizeFromMax(max);
  return {
    width: size,
    height: size,
    borderTopWidth: '1px',
    borderRightWidth: el.col === el.cols - 1 ? '1px' : '0',
    borderBottomWidth: el.row === el.rows - 1 ? '1px' : '0',
    borderLeftWidth: '1px',
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopColor: chess ? 'black' : 'red',
    borderRightColor: chess ? 'black' : 'red',
    borderBottomColor: chess ? 'black' : 'red',
    borderLeftColor: chess ? 'black' : 'red',
    display: 'inline-block',
    fontSize: '18px',
    ...el._getStyleMixin('hostStyleMixin'),
  };
};

const textStyle = (el) => {
  const max = Math.max(el.cols, el.rows);
  const size = getSizeFromMax(max);
  return {
    lineHeight: size,
    color: 'black',
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
      class: this._renderHostAttributesClass(hostStyle),
    };
  }

  render() {
    const { row, col } = this;
    return html`
      <div class="${this._renderClass(textStyle)}">${row+1}:${col+1}</div>
    `;
  }
}

customElements.define('ref-cell', RefCell);
