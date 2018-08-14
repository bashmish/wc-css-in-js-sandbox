import { RefElement, html } from './ref-element.js';

const getSizeFromMax = (max) => max <= 20 ? '4vw' : `${80/max}vw`;

const hostStyle = (props) => {
  const chess = props.cols === 8 && props.rows === 8;
  const max = Math.max(props.cols, props.rows);
  const size = getSizeFromMax(max);
  return {
    width: size,
    height: size,
    borderTopWidth: '1px',
    borderRightWidth: props.col === props.cols - 1 ? '1px' : '0',
    borderBottomWidth: props.row === props.rows - 1 ? '1px' : '0',
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
    ...props.hostStyleMixin,
  };
};

const textStyle = (props) => {
  const max = Math.max(props.cols, props.rows);
  const size = getSizeFromMax(max);
  return {
    lineHeight: size,
    color: 'black',
    ...props.textStyleMixin,
  };
};

export class RefCell extends RefElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
      col: Number,
    };
  }

  _renderHost({ cl }) {
    return {
      class: cl(hostStyle),
    };
  }

  _render({ row, col, cl }) {
    return html`
      <div class$="${cl(textStyle)}">${row+1}:${col+1}</div>
    `;
  }
}

customElements.define('ref-cell', RefCell);
