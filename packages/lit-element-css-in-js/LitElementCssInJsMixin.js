import { createRenderer, combineRules } from './css-in-js.js';
import deepMerge from 'deepmerge';

if (!window.ShadowRoot) {
  window.ShadowRoot = class NoClass {};
}

export const LitElementCssInJsMixin = (superKlass) => {
  return class LitElementCssInJsMixin extends superKlass {
    constructor() {
      super();
      this._renderChildClass = this._renderChildClass.bind(this);
      this._renderHostClass = this._renderHostClass.bind(this);
    }

    createRenderRoot() {
      return this;
    }

    updated() {
      this.__applyRenderHost();
    }

    _invalidate() {
      this.__styleMixins = {};
      super._invalidate();
    }

    /**
     * Adds mixins.
     * @param {Object} mixins
     */
    _mixStyle(mixins) {
      Object.keys(mixins).forEach((mixinName) => {
        this.__styleMixins[mixinName] = this.__styleMixins[mixinName] || [];
        this.__styleMixins[mixinName] = [mixins[mixinName], ...this.__styleMixins[mixinName]];
      });
    }

    /**
     * Merges all mixin styles for the specified name.
     * @param {string} name
     */
    _getStyleMixin(name) {
      const mixins = this.__styleMixins[name];
      const funcs = this.__transformObjOrFuncsToOnlyFuncs(mixins);
      const objects = funcs.map(f => f(this));
      return deepMerge.all(objects);
    }

    /**
     * Renders class selector for provided styles for this custom element children.
     * @param {Array<function|Object>} objOrFuncs styles object or function returning styles object
     * @returns {string} space separated class names
     */
    _renderChildClass(...objOrFuncs) {
      const funcs = this.__transformObjOrFuncsToOnlyFuncs(objOrFuncs);
      const fullRule = combineRules(...funcs);
      return this.__getStyleRenderer('child', 'Child').renderRule(fullRule, this);
    }

    /**
     * Renders class selector for provided styles for this custom element host.
     * @param {Array<function|Object>} objOrFuncs styles object or function returning styles object
     * @returns {string} space separated class names
     */
    _renderHostClass(...objOrFuncs) {
      const funcs = this.__transformObjOrFuncsToOnlyFuncs(objOrFuncs);
      const fullRule = combineRules(...funcs);
      return this.__getStyleRenderer('host', 'Host').renderRule(fullRule, this);
    }

    __getStyleRenderer(type, typeCapital) {
      if (this[`__cached${typeCapital}StyleRenderer`]) {
        return this[`__cached${typeCapital}StyleRenderer`];
      }

      const root = this[`__get${typeCapital}ShadowParentRoot`]();

      if (root[`__cached${typeCapital}StylesRenderer`]) {
        this[`__cached${typeCapital}StyleRenderer`] = root[`__cached${typeCapital}StylesRenderer`];
        return root[`__cached${typeCapital}StylesRenderer`];
      }

      const styleRenderer = createRenderer(root, type);

      this[`__cached${typeCapital}StyleRenderer`] = styleRenderer;
      root[`__cached${typeCapital}StylesRenderer`] = styleRenderer;

      this.updateComplete.then(() => {
        styleRenderer.addToDOM();
      });

      return styleRenderer;
    }

    __getChildShadowParentRoot() {
      if (!this.attachShadow) {
        return document;
      }
      if (this.shadowRoot) {
        return this.shadowRoot;
      } else {
        return this.getRootNode();
      }
    }

    __getHostShadowParentRoot() {
      if (!this.attachShadow) {
        return document;
      }
      if (this.shadowRoot) {
        return this.shadowRoot.host.getRootNode();
      } else {
        return this.getRootNode();
      }
    }

    __applyRenderHost() {
      if (!this.renderHostAttributes) { return; }
      const hostConfig = this.renderHostAttributes();
      this.__applyHostConfig(hostConfig);
    }

    __applyHostConfig(hostConfig) {
      const hostConfigWithoutClass = { ...hostConfig };
      delete hostConfigWithoutClass.class;

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

    __transformObjOrFuncsToOnlyFuncs(objOrFuncs) {
      return objOrFuncs.map((objOrFunc) => {
        return typeof objOrFunc === 'function' ? objOrFunc : () => objOrFunc;
      });
    }
  };
}
