# @unmilley/compare-arrays

Comparison of JavaScript object arrays with additional results.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## Usage

Install the package:

```bash
# pnpm
pnpm add @unmilley/compare-arrays
# yarn
yarn add @unmilley/compare-arrays
# npm
npm install @unmilley/compare-arrays
```

Import:

```ts
import { compareArrays } from "@unmilley/compare-arrays";

// Option 1: Simple comparison (returns boolean)
const arraysEqual = compareArrays(oldData, newData);
console.log(arraysEqual); // true or false

// Option 2: Getting change counters
const changes = compareArrays(oldData, newData, { withCounter: true });
console.log(changes); // { added: 2, deleted: 1 }

// Option 3: Explicitly specifying withoutCounter
const isEqual = compareArrays(oldData, newData, { withCounter: false });
console.log(isEqual); // true or false
```

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

[MIT][license-href]. Made with 💛

[npm-version-src]: https://img.shields.io/npm/v/@unmilley/compare-arrays?style=flat&colorA=18181B&colorB=fbd38d
[npm-version-href]: https://npmjs.com/package/@unmilley/compare-arrays
[npm-downloads-src]: https://img.shields.io/npm/dm/@unmilley/compare-arrays?style=flat&colorA=18181B&colorB=fbd38d
[npm-downloads-href]: https://npmjs.com/package/@unmilley/compare-arrays
[license-src]: https://img.shields.io/github/license/unmilley/compare-arrays.svg?style=flat&colorA=18181B&colorB=fbd38d
[license-href]: https://github.com/unmilley/compare-arrays/blob/main/LICENSE
