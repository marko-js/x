<h1 align="center">x</h1>
<p align="center">
  <!-- Structure -->
  <a href="https://github.com/lerna/lerna">
    <img src="https://img.shields.io/badge/monorepo-lerna-531099.svg" alt="Lerna"/>
  </a>
  <!-- Format -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with prettier"/>
  </a>
  <!-- License -->
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/marko-js/utils.svg" alt="MIT"/>
  </a>
  <!-- CI -->
  <img src="https://img.shields.io/badge/stability-experimental-orange.svg" alt="Experimental"/>
  <!-- It's a joke -->
  <img src="https://img.shields.io/badge/🐛-Has Bugs-green.svg" alt="Buggy"/>
</p>

This repo provides a consistent build, test, & development environment around experiments related to the Marko ecosystem. These packages are not ready to be used.

## Packages

- [babel-plugin-html](https://github.com/marko-js/utils/blob/master/packages/babel-plugin-htmljs) -
  parse htmljs to a babel ast

## Contributing

You probably don't want to touch this code. But in case you do...

### [npm](https://twitter.com/chriscoyier/status/896051713378992130) scripts

- `test` Run the tests for all packages
- `publish` Runs build and begins publishing any changed packages
- `build` Runs babel on the `src` folder for every package _(runs on publish)_
- `format` Formats the files in the repo _(runs on precommit)_
- `lint` Lints the files in the repo _(runs on precommit)_

## Code of Conduct

This project adheres to the [eBay Code of Conduct](./.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
