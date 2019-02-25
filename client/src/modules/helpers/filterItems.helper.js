//  filter items out of a given dictionary
 export default function filterComments(indexes, dictionary) {
	const filteredItemsList = [];
	indexes.forEach((item) => {
		filteredItemsList.push(dictionary[item]);
	});
	return filteredItemsList;
};
