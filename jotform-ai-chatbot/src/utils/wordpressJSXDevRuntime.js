// WordPress exposes jsx/jsxs, but not Parcel's development-only jsxDEV entry point.
// Both builds must create elements with the React runtime provided by WordPress.
export const { Fragment, jsx: jsxDEV } = window.ReactJSXRuntime;
