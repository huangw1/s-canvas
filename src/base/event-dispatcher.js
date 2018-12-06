/**
 * user bubble, not support capture
 */
class EventDispatcher {
    constructor() {
        this._listeners = null;
    }

    on(type, listener) {
        return this.addEventListener(type, listener, false);
    }

    once(type, listener) {
        this.addEventListener(type, listener, true);
    }

    off(type, listener) {
        this.removeEventListener(type, listener);
    }

    addEventListener(type, listener, once) {
        this._listeners = this._listeners || {};
        if(!this._listeners[type]) {
            this._listeners[type] = [];
        }
        const _listeners = this._listeners[type];
        let listenerObj = _listeners.find(listenerObj => listenerObj.listener === listener);
        if(!listenerObj) {
            listenerObj = {
                listener,
                once,
                type
            };
            _listeners.push(this._bindListener(listenerObj));
        }
        return () => {
            this._removeEventListenerByKey(listenerObj);
        };
    }

    _bindListener(listenerObj) {
        listenerObj.boundListener = (event, ...params) => {
            if(listenerObj.once) {
                this._removeEventListenerByKey(listenerObj);
            }
            return listenerObj.listener(event, ...params)
        };
        return listenerObj;
    }

    _removeEventListenerByKey(listenerObj) {
        this.removeEventListener(listenerObj.type, listenerObj.listener);
    }

    removeEventListener(type, listener) {
        if(!this._listeners) {
            return;
        }
        if(!this._listeners[type]) {
            return;
        }
        const _listeners = this._listeners[type];
        const index = _listeners.findIndex(listenerObj => listenerObj.listener === listener);
        if(index !== -1) {
            _listeners.splice(index, 1);
        }
    }

    dispatchEvent(event) {
        let list = [this];
        let instance = this;
        while(instance.parent) {
            list.push(instance.parent);
            instance = instance.parent;
        }
        for(let i = 0; i < list.length && !event.propagationStopped; i++) {
            this._dispatchEvent(event);
        }
    }

    _dispatchEvent(event, ...params) {
        if(this._listeners) {
            const _listeners = this._listeners[event.type];
            if(_listeners) {
                _listeners.forEach(listenerObj => listenerObj.boundListener(event, ...params));
            }
        }
    }
}

export default EventDispatcher
