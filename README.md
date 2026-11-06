# @macle-community/taro-plugin-macle

> Official community Taro 3/4 platform plugin for Macle (Huawei / Ethio Telecom Mini Programs).

[![npm version](https://img.shields.io/npm/v/@macle-community/taro-plugin-macle.svg)](https://www.npmjs.com/package/@macle-community/taro-plugin-macle)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📦 Installation

```bash
# Using npm
npm install @macle-community/taro-plugin-macle --save-dev

# Using pnpm
pnpm add -D @macle-community/taro-plugin-macle

# Using yarn
yarn add -D @macle-community/taro-plugin-macle
```

---

## 🚀 Usage

Add the plugin to your Taro configuration (`config/index.js` or `config/index.ts`):

```javascript
// config/index.js
module.exports = {
  // ...
  plugins: [
    '@macle-community/taro-plugin-macle'
  ]
}
```

### Build Commands

```bash
# Build for production
taro build --type macle

# Build with watch mode (development)
taro build --type macle --watch
```

---

## 🎨 MAUI Native Components (34 Components)

This plugin includes full support and TypeScript definitions for Macle's **MAUI** component library:

- **Basic**: `maui-button`, `maui-cell`, `maui-cell-group`, `maui-col`, `maui-row`, `maui-divider`, `maui-empty`, `maui-list`, `maui-loading`, `maui-progress`, `maui-tag`
- **Form**: `maui-checkbox`, `maui-checkbox-group`, `maui-radio`, `maui-radio-group`, `maui-field`, `maui-slider`, `maui-stepper`, `maui-switch`
- **Feedback & Navigation**: `maui-dialog`, `maui-modal`, `maui-toast`, `maui-overlay`, `maui-popup`, `maui-steps`, `maui-sidebar`, `maui-tab`, `maui-tabs`, `maui-sticky`, `maui-title-bar`

---

## 📄 License

MIT © [Macle Community & natiDotnet](https://github.com/natiDotnet)
