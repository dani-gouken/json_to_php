import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import svelte from "rollup-plugin-svelte"

export default [
    {
		input: 'src/main.js',
		output: {
			name: 'bundle',
			file: "dist/json_to_php.js",
			format: 'umd'
		},
		plugins: [
			svelte(
			),
			resolve({
				browser: true
			}), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			babel({
				exclude: ['node_modules/**']
			})
		]
	},
]