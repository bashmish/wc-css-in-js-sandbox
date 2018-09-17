class Renderer {
  constructor(parent, type) {
    this.__parent = parent;
    this.__type = type;
    this.__styleNode = document.createElement('style');
    this.__styleNode.setAttribute('renderer-type', type);
    this.__cache = {};
    this.__counter = 0;
  }

  get styleNode() {
    return this.__styleNode;
  }

  renderRule(styleFunc, props) {
    const styleObj = styleFunc(props);
    const styleKey = JSON.stringify(styleObj);
    let klass = this.__cache[styleKey];
    if (!klass) {
      klass = this._generateClass(styleObj);
      this.__cache[styleKey] = klass;
    }
    return klass;
  }

  addToDOM() {
    if (this.__type === 'host') {
      const childTypeNode = this.__parent.querySelector('style[renderer-type="child"]');
      if (childTypeNode) {
        this.__parent.insertBefore(this.__styleNode, childTypeNode);
        return;
      }
    }
    this.__parent.appendChild(this.__styleNode);
  }

  _generateClass(styleObj) {
    const klass = `${this.__type}${this.__counter}`;
    const rules = this._generateStyle(klass, styleObj);
    this.__styleNode.textContent += rules;
    this.__counter++;
    return klass;
  }

  _generateStyle(klass, styleObj) {
    const klassSelector = `.${klass}`;
    const selectors = {
      [klassSelector]: [],
    };
    Object.keys(styleObj).forEach(key => {
      const val = styleObj[key];
      if (typeof val === 'object') {
        const childSelector = `${klassSelector}${key}`;
        selectors[childSelector] = [];
        Object.keys(val).forEach(childKey => {
          const childVal = val[childKey];
          selectors[childSelector].push(`${childKey}:${childVal};`);
        });
      } else {
        selectors[klassSelector].push(`${key}:${val};`);
      }
    });
    return Object.keys(selectors).map(selector => {
      return `${selector} { ${selectors[selector].join('')} }`;
    }).join('');
  }
}

export function createRenderer(node, type) {
  const parent = node.nodeType === Node.DOCUMENT_NODE ? document.head : node;
  return new Renderer(parent, type);
}

export function combineRules(...objects) {
  return objects[0];
}
