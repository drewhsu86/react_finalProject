export const uniqueKey = (index) => {
	return `_` + Math.random(index, 10000).toString(36).substring(2);
};
