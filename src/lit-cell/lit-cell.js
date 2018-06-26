import { LitElement, html, createStaticStyle, createDynamicStyle } from '../lit-element/lit-element.js';

const hostStaticClass = createStaticStyle({
  display: 'inline-block',
  fontSize: '18px',
  '&.black': {
    backgroundColor: 'black',
  },
  '&.white': {
    backgroundColor: 'lightgrey',
  },
});

const hostDynamicClass = createDynamicStyle((props) => {
  const max = Math.max(props.cols, props.rows);
  const size = max <= 20 ? '4vw' : `${80/max}vw`;
  return {
    width: size,
    height: size,
  }
});

export class LitCell extends LitElement {
  static get properties() {
    return {
      rows: Number,
      cols: Number,
      row: Number,
      col: Number,
    };
  }

  _renderHost(props) {
    return {
      class: `${hostStaticClass} ${hostDynamicClass(props)}`,
    };
  }

  _render({ row, col }) {
    return html`${row+1}:${col+1}`;
  }
}

customElements.define('lit-cell', LitCell);
