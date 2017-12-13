"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
/**
 * Allows the tracking of which field is active.
 * Will call a lost focus function for the previously active field.
 * Registering a listener with hasFocus set to true will trigger the above.
 * Only 1 active field supported.
 *
 * To implement - call registerListener in onComponentMount and unregister on onComponentWillUnmount
 */
class FocusTracker {
    constructor() {
        this.registeredListeners = [];
        this.registerListener = (newListener) => {
            if (newListener.hasFocus) {
                this.unfocusActive();
            }
            let exists = _.findIndex(this.registeredListeners, (listener) => {
                return listener.reference == newListener.reference;
            });
            if (exists > -1) {
                this.registeredListeners[exists] = newListener;
            }
            else {
                this.registeredListeners.push(newListener);
            }
        };
        this.unregisterListener = (reference) => {
            this.registeredListeners = _.remove(this.registeredListeners, (listener) => {
                return listener.reference === reference;
            });
        };
        this.unfocusActive = () => {
            if (this.registeredListeners.length < 1) {
                return;
            }
            else {
                let active = _.findIndex(this.registeredListeners, (listener) => {
                    return listener.hasFocus;
                });
                if (active > -1) {
                    let listener = this.registeredListeners[active];
                    listener.lostFocus();
                    listener.hasFocus = false;
                    this.registeredListeners[active] = listener;
                }
            }
        };
    }
}
exports.FocusTracker = FocusTracker;
exports.default = new FocusTracker();
