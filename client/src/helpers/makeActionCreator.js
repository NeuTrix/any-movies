// generates an action creator function, minimizing boilerplate
// 'type' is required by convention
// 'names' are the names of the additional values passed to the action
export default function makeActionCreator(type, ...names) {
	return function newAction(...args) {
		const action = { type };

		names.forEach((prop, index) => {
			action[prop] = args[index];
		});

		console.log('Created a new action object', action);
		return action;
	};
}
