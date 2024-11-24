export const titleCase = (words) => {
	if (words === '') {
		return ''
	}

	const result = words.replace(/(\w)(\w*)/g, function (_g0, g1, g2) {
		return g1.toUpperCase() + g2.toLowerCase()
	})
	return result
}