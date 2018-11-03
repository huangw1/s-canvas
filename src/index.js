
import SC from './core';


export default {

    version: '1.0.0',

    _originalSC: window.SC,

    noConflict() {
        window.SC = SC._originalSC;
    },

    init(...props) {
        return new SC(...props);
    }
}