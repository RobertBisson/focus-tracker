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
export declare class FocusTracker {
    registeredListeners: Array<ListenerObject>;
    registerListener: (newListener: ListenerObject) => void;
    unregisterListener: (reference: any) => void;
    unfocusActive: () => void;
}
declare const _default: FocusTracker;
export default _default;
