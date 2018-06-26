import { LitElement as OriginalLitElement } from '@polymer/lit-element';
import { css as cssEmotion } from '../../vendor/emotion.js';
import { createRenderer, renderToDOM } from '../../vendor/fela.js';

export { html } from 'lit-html/lib/lit-extended.js';

const cssSolution = 'emotion'; // emotion, fela, disabled
const cssSolutions = {};

// emotion
cssSolutions['emotion'] = {
  createStaticStyle(obj) {
    return cssEmotion(obj);
  },
  createDynamicStyle(func) {
    return (state) => cssEmotion(func(state));
  },
}

// fela
const felaRenderer = createRenderer();
renderToDOM(felaRenderer);
cssSolutions['fela'] = {
  createStaticStyle(obj) {
    return felaRenderer.renderRule(() => obj);
  },
  createDynamicStyle(func) {
    return (state) => felaRenderer.renderRule(func, state);
  },
}

// disabled
cssSolutions['disabled'] = {
  createStaticStyle(obj) {
    return '';
  },
  createDynamicStyle(func) {
    return (state) => '';
  },
}

export const createStaticStyle = cssSolutions[cssSolution].createStaticStyle;
export const createDynamicStyle = cssSolutions[cssSolution].createDynamicStyle;

export class LitElement extends OriginalLitElement {
  _createRoot() {
    return this;
  }

  _applyRender(result, node) {
    super._applyRender(result, node);
    this._applyRenderHost();
  }

  _applyRenderHost() {
    if (!this._renderHost) { return; }
    const hostConfig = this._renderHost(this);
    this.__applyHostConfigClass(hostConfig);
  }

  __applyHostConfigClass(hostConfig) {
    if (hostConfig.class) {
      const prevClasses = this.__prevHostClasses || [];
      const newClasses = this.__getClasses(hostConfig.class);
      prevClasses.forEach((klass) => {
        if (newClasses.indexOf(klass) === -1) {
          this.classList.remove(klass);
        }
      });
      newClasses.forEach((klass) => {
        // no need to check previous because
        // host could have get updated class attribute from the outside
        // so we need to add classes again anyway just in case they were removed
        this.classList.add(klass);
      });
      this.__prevHostClasses = newClasses;
    }
  }

  __getClasses(classString) {
    return classString.split(' ').filter(Boolean);
  }
}
