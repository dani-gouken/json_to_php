/**
 * @typedef {Object} Dep
 * @property {string} className
 * @property {string} key
 * @property {Object} value
 * 
 * @typedef {Object} Deps
 * @method {string} className
 * @property {string} key
 * @property {Object} value
 */
export default function () {
    let _deps = [];
    let _keys = [];
    let _index = 0;
    /**
     * @param {Dep} dep 
     */
    const add = (dep) => {
        _keys.push(dep.className);
        _deps[dep.className] = dep;

        return _inner;
    }
    /**
     * @param {string} className 
     * @returns {boolean}
     */
    const has = (className) => _deps.includes(className)
    /**
     * @returns {Dep[]}
     */
    const all = () => _deps;

    /**
     * @param {Dep} className 
     * @return {Dep}
     */
    const get = () => {
        if (Object.keys(_deps).length === 0) return null;
        const className = _keys[_index];
        const val = _deps[className];
        delete _deps[className];
        _index++;
        return val;
    }
    const _inner = {
        add,
        has,
        all,
        get
    }
    return _inner;
};