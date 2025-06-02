import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const eslintConfig = [
	...compat.config({
		extends: ["next", "next/core-web-vitals", "next/typescript", "prettier"],
		rules: {
			"@next/next/no-img-element": "off",
			"react-hooks/exhaustive-deps": "off",
		},
	}),
];

export default eslintConfig;
