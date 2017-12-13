import * as _ from "lodash";
export interface ListenerObject {
    gainedFocus?: Function;
    lostFocus: Function;
    hasFocus: boolean;
    reference: any;
}

/**
 * Allows the tracking of which field is active.
 * Will call a lost focus function for the previously active field.
 * Registering a listener with hasFocus set to true will trigger the above.
 * Only 1 active field supported.
 *
 * To implement - call registerListener in onComponentMount and unregister on onComponentWillUnmount
 */
export class FocusTracker {
    registeredListeners: Array<ListenerObject> = [];

    registerListener = (newListener: ListenerObject) => {
        if (newListener.hasFocus) {
            this.unfocusActive();
        }
        let exists = _.findIndex(this.registeredListeners, (listener: ListenerObject) => {
            return listener.reference == newListener.reference;
        });
        if (exists > -1) {
            this.registeredListeners[exists] = newListener;
        } else {
            this.registeredListeners.push(newListener);
        }
    };
    unregisterListener = (reference: any) => {
        this.registeredListeners = _.remove(
            this.registeredListeners,
            (listener: ListenerObject) => {
                return listener.reference === reference;
            }
        );
    };

    unfocusActive = () => {
        if (this.registeredListeners.length < 1) {
            return;
        } else {
            let active = _.findIndex(this.registeredListeners, (listener: ListenerObject) => {
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

export default new FocusTracker();
