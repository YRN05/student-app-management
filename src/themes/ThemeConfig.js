export const colorRules = {
	"primary-color": "#038767",
	"warning-color": "#f49342",
	"erorr-color": "#d44140",
}

export const ThemeConfig = {
	token: {
		colorPrimary: colorRules["primary-color"],
		borderRadius: "10px",
	},
	components: {
		Menu: {
			itemSelectedBg: colorRules["primary-color"],
		},
	},
}
