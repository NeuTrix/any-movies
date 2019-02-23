// generates an action creator function, minimizing boilerplate
// 'type' is required by convention
// 'names' are the names of the additional values passed to the action
export default function makeActionCreator(type, ...payloadPropertyNames) {
	return function newAction(...args) {
		// returns a paylod object as part of the action
		const action = { type, payload: {} };

		payloadPropertyNames.forEach((prop, index) => {
			action.payload[prop] = args[index];
		});

		console.log('Created a new action object', action);
		return action;
	};
}
 