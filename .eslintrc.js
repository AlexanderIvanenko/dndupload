module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"parser": "babel-eslint",
	"extends": "standard",
	"plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
	"rules": {
		"indent": ["error", "tab"],
		"no-tabs": 0,
	}
}