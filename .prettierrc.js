module.exports = {
	semi: true,
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSameLine: false,
	bracketSpacing: true,
	arrowParens: 'avoid',
	endOfLine: 'lf',
	overrides: [
		{
			files: ['.js', '.ts'],
			options: { parser: 'typescript' }
		},
		{
			files: ['.json', '.prettierrc'],
			options: { parser: 'json' }
		},
		{
			files: ['package.json', 'ng-package.json'],
			options: { parser: 'json-stringify' }
		},
		{
			files: ['.less'],
			options: { parser: 'less' }
		},
		{
			files: ['.scss'],
			options: { parser: 'scss' }
		},
		{
			files: ['.component.html', '.template.html'],
			options: { parser: 'angular' }
		},
		{
			files: ['.svg'],
			options: { parser: 'xml' }
		},
		{
			// @prettier/plugin-xml
			files: ['.xml'],
			options: { parser: 'xml' }
		},
		{
			files: ['.yml', '.yaml'],
			options: { parser: 'yaml', tabWidth: 2 }
		},
		{
			files: ['.md'],
			options: { parser: 'markdown', tabWidth: 2 }
		}
	]
};
