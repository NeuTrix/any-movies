//  filter items out of a given dictionary
export default function filterCommentsToArray(indexes, dictionary) {
	const filteredItemsList = [];
	indexes.forEach((item) => {
		if (dictionary[item]) {
			filteredItemsList.push(dictionary[item]);
		}
	});
	return filteredItemsList;
}
