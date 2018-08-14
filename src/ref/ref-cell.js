import { RefElement, html } from './ref-element.js';

const hostStyle = (props) => {
  const max = Math.max(props.cols, props.rows);
  const size = max <= 20 ? '4vw' : `${80/max}vw`;
  return {
    width: size,
    height: size,
    display: 'inline-block',
    fontSize: '18px',
    '&.black': {
      backgroundColor: 'black',
    },
    '&.white': {
      backgroundColor: 'lightgrey',
    },
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

  _render({ row, col }) {
    return html`${row+1}:${col+1}`;
  }
}

customElements.define('ref-cell', RefCell);
