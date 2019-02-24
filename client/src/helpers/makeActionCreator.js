// generates an action creator function, minimizing boilerplate
export default function makeActionCreator(type, ...payloadPropertyNames) {
	return function newAction(...args) {
		// returns a paylod object as part of the action
		const action = { type, payload: {} };

		payloadPropertyNames.forEach((prop, index) => {
			action.payload[prop] = args[index];
		});

		return action;
	};
}
