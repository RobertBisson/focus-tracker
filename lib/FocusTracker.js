"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * Allows the tracking of which field is active.
 * Will call a lost focus function for the previously active field.
 * Registering a listener with hasFocus set to true will trigger the above.
 * Only 1 active field supported.
 *
 * To implement - call registerListener in onComponentMount and unregister on onComponentWillUnmount
 */
var FocusTracker = /** @class */ (function () {
    function FocusTracker() {
        var _this = this;
        this.registeredListeners = [];
        this.getActive = function () {
            if (_this.registeredListeners.length < 1) {
                return;
            }
            else {
                var active = _.findIndex(_this.registeredListeners, function (listener) {
                    return listener.hasFocus;
                });
                if (active > -1) {
                    var listener = _this.registeredListeners[active];
                    return listener;
                }
            }
            return null;
        };
        this.registerListener = function (newListener) {
            if (newListener.hasFocus) {
                _this.unfocusActive();
            }
            var exists = _.findIndex(_this.registeredListeners, function (listener) {
                return listener.reference == newListener.reference;
            });
            if (exists > -1) {
                _this.registeredListeners[exists] = newListener;
            }
            else {
                _this.registeredListeners.push(newListener);
            }
        };
        this.unregisterListener = function (reference) {
            _this.registeredListeners = _.remove(_this.registeredListeners, function (listener) {
                return listener.reference === reference;
            });
        };
        this.unfocusActive = function () {
            if (_this.registeredListeners.length < 1) {
                return;
            }
            else {
                var active = _.findIndex(_this.registeredListeners, function (listener) {
                    return listener.hasFocus;
                });
                if (active > -1) {
                    var listener = _this.registeredListeners[active];
                    listener.lostFocus();
                    listener.hasFocus = false;
                    _this.registeredListeners[active] = listener;
                }
            }
        };
    }
    return FocusTracker;
}());
exports.FocusTracker = FocusTracker;
exports.default = new FocusTracker(); // Export in this format to make the Focus tracker a singleton
