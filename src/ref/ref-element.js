import { LitElement } from '@polymer/lit-element';
import { createRenderer, renderToDOM } from '../../vendor/fela.js';

export { html } from 'lit-html/lib/lit-extended.js';

// TODO: disable window.ShadyCSS for all browsers

export class RefElement extends LitElement {
  constructor() {
    super();
    this.__litElementShadowRoot = this.attachShadow({ mode: 'open' });
  }

  _createRoot() {
    return this.__litElementShadowRoot;
  }

  _propertiesChanged(props, changedProps, prevProps) {
    const newProps = { ...props, cl: this._renderClass.bind(this) }
    super._propertiesChanged(newProps, changedProps, prevProps);
  }

  _didRender(props) {
    this.__applyRenderHost(props);

    if (this.shadowRoot && this.shadowRoot.__felaRenderer) {
      this.shadowRoot.appendChild(this.shadowRoot.__felaRenderer.nodes.RULE);
    }
  }

  /**
   * Renders class selector for provided styles for this custom element children.
   * @param objOrFunc styles object or function returning styles object
   * @returns {string} space separated class names
   */
  _renderClass(objOrFunc) {
    // TODO: cache for same static object input
    this.__ensureRenderer(this.__getChildShadowParent());
    return this.__getFelaClass(this.__getChildShadowParent(), objOrFunc);
  }

  /**
   * Renders class for provided styles for this custom element host.
   * @param objOrFunc styles object or function returning styles object
   * @returns {string} space separated class names
   */
  _renderHostClass(objOrFunc) {
    // TODO: cache for same static object input
    this.__ensureRenderer(this.__getHostShadowParent());
    const renderer = this.__getHostShadowParent().__felaRenderer;

    const klass = this.__getFelaClass(this.__getHostShadowParent(), objOrFunc);
    const classes = this.__getClasses(klass);

    // hack to make styleNode.sheet available
    // why? because lit-html removes manually added style nodes in between renders
    // and style node detached from DOM lacks the `sheet` property
    // TODO: improve rendering to not loose once rendered style nodes
    if (!renderer.nodes.RULE.sheet) {
      const root = this.__getHostShadowParent();
      root.appendChild(renderer.nodes.RULE);
    }

    return this.__makeClassesLessSpecific(renderer, classes);
  }

  __ensureRenderer(root) {
    if (root.__felaReady) { return; }

    const felaRenderer = createRenderer();

    if (window.ShadyCSS) {
      renderToDOM(felaRenderer);
    } else {
      const tempQuerySelectorAll = document.querySelectorAll;
      document.querySelectorAll = () => [];
      renderToDOM(felaRenderer);
      document.querySelectorAll = tempQuerySelectorAll;
    }

    felaRenderer.renderRule(() => ({ display: 'block' }));

    root.__felaRenderer = felaRenderer;
    root.__felaReady = true;
    felaRenderer.__initialRuleSheet = felaRenderer.nodes.RULE.sheet;

    if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      root.appendChild(felaRenderer.nodes.RULE);
    }
  }

  __makeClassesLessSpecific(renderer, classes) {
    const hostStyleNode = this.__getHostStyleNode();
    const classesSheet = renderer.nodes.RULE.sheet;
    return classes.map(function __mapClassesToLessSpecific(klass) {
      const classRule = this.__findClassRule(classesSheet.cssRules, klass);
      const selector = classRule.selectorText;

      // this selector may be more specific due to nested selectors support by fela (e.g. `.a.nestedClass`)
      // so we are calculating the remaining part (e.g. `.nestedClass`)
      // and also take into account different possible order (e.g. `.nestedClass.a`)
      let remainingClassSelector;
      if (selector.startsWith(`.${klass}`)) {
        remainingClassSelector = selector.slice(klass.length + 1);
      } else {
        remainingClassSelector = selector.slice(0, selector.length - klass.length - 1);
      }

      const hostClassName = `host-${klass}`;

      // news selector can be
      // - just a class selector if this is a normal fela style definition (e.g. `.host-a`)
      // - a selector with a nested selector (e.g. `.host-a.nestedClass`)
      const newSelector = `.${hostClassName}${remainingClassSelector}`;

      const newRule = classRule.cssText.replace(selector, newSelector);

      // TODO: cache for performance
      if (hostStyleNode.textContent.indexOf(newRule) === -1) {
        hostStyleNode.textContent += newRule;
      }

      // TODO: implement this logic for production
      // hostStyleNode.sheet.insertRule(newRule, hostStyleNode.sheet.cssRules.length);

      return hostClassName;
    }.bind(this)).join(' ');
  }

  __findClassRule(rules, klass) {
    const classSelector = `.${klass}`;
    let classRule;
    for (const rule of rules) {
      // this algorithm is based on the assumption that all fela classes are ordered
      // so for short classes it does not matter whether there are similar ones with a few more chars
      // meaning that if we are looking for class `.a` then
      // even if there is `.aa` class somewhere down the list we will still match `.a` before it
      // TODO: improve performance of this lookup
      const selector = rule.selectorText;
      if (selector.startsWith(classSelector) || selector.endsWith(classSelector)) {
        classRule = rule;
        break;
      }
    }
    return classRule;
  }

  __getHostStyleNode() {
    const root = this.__getHostShadowParent();
    if (!root.__HOST_STYLE) {
      const node = document.createElement('style');
      node.type = 'text/css';
      if (root.nodeType === Node.DOCUMENT_NODE) {
        document.head.appendChild(node);
      } else {
        root.appendChild(node);
      }
      root.__HOST_STYLE = node;
    }
    return root.__HOST_STYLE;
  }

  __getHostShadowParent() {
    if (window.ShadyCSS) {
      return document;
    }
    if (this.shadowRoot) {
      return this.shadowRoot.host.getRootNode();
    } else {
      return this.getRootNode();
    }
  }

  __getChildShadowParent() {
    if (window.ShadyCSS) {
      return document;
    }
    if (this.shadowRoot) {
      return this.shadowRoot;
    } else {
      return this.getRootNode();
    }
  }

  __getFelaClass(root, objOrFunc) {
    if (typeof objOrFunc === 'function') {
      return root.__felaRenderer.renderRule(objOrFunc, this);
    } else {
      return root.__felaRenderer.renderRule(() => objOrFunc);
    }
  }

  __applyRenderHost(props) {
    if (!this._renderHost) { return; }
    const extProps = { ...props, cl: this._renderHostClass.bind(this) };
    const hostConfig = this._renderHost(extProps);
    this.__applyHostConfig(hostConfig);
  }

  __applyHostConfig(hostConfig) {
    const hostConfigWithoutClass = Object.keys(hostConfig).reduce((acc, key) => {
      if (key !== 'class') {
        acc[key] = hostConfig[key];
      }
      return acc;
    }, {});

    // class attribute has special handling
    this.__applyHostConfigClass(hostConfig.class || '');
    // hence class is removed from this normal logic
    this.__applyHostConfigAttributes(hostConfigWithoutClass);
  }

  __applyHostConfigClass(hostClass) {
    const prevClasses = this.__prevHostClasses || [];
    const newClasses = this.__getClasses(hostClass);
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

  __applyHostConfigAttributes(hostConfig) {
    this.__prevHostConfig = this.__prevHostConfig || {};
    Object.keys(this.__prevHostConfig).forEach((attrName) => {
      if (this.__prevHostConfig[attrName] !== hostConfig[attrName]) {
        this.removeAttribute(attrName);
      }
    });
    Object.keys(hostConfig).forEach((attrName) => {
      // no need to check previous because
      // host could have get updated attributes from the outside
      // so we need to add attributes again anyway just in case they were removed
      this.setAttribute(attrName, hostConfig[attrName]);
    });
    this.__prevHostConfig = hostConfig;
  }

  __getClasses(classString) {
    return classString.split(' ').filter(Boolean);
  }
}
