# focus-tracker

Track focus events on fields, the currently active field and call blur functions automatically when switching active fields.

React/RN implementation:

Focus Tracker is implemented as a Singleton.

# Example React Native

    import FocusTracker from "focus-tracker";

    class Example extends React.Component<{},{}>{
    	constructor(){
        //set this._refID to a unique
    	}
    	componentDidMount(){
    	  FocusTracker.registerListener({
    		  lostFocus: this.blur,
    		  hasFocus: false,
    		  reference: this._refID //Unique ID
    		});
    	}
    	blur(){
    		//Blur focus
    	}
    	onFocus(){
    		FocusTracker.registerListener({
    		  lostFocus: this.blur,
    		  hasFocus: true,
    		  reference: this._refID
    		});
    	}
    	componentWillUnmount(){
    		FocusTracker.unregisterListener(this._refID);
    	}
    }
