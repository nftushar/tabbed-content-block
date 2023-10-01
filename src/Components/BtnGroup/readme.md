# BtnGroup

BtnGroup is used to use button group like radio option.


## Table of contents

1. [Usage](#usage)
2. [Options](#options)

<br />

## Usage

### block.json
Add an attribute in `block.json` file.

```json
"option": {
	"type": "object",
	"default": {
		"color": "default"
	}
}
```

<br />

### Settings.js

```jsx
import { BtnGroup } from '../../Components';

const options = [
	{ label: __('Default', 'text-domain'), value: 'default' }
	{ label: __('Option 1', 'text-domain'), value: 'option1' }
];

const { option } = attributes;

return <BtnGroup value={option} onChange={val => setAttributes({ option: val })} options={options} />
```

More props in [Options](#options).

<br />

## Options
### Props
Set this options as props of `<BtnGroup />` component that used in `Settings.js`.

<br />

### className

Use it to set any `className`.

-   Type: `String`
-   Required: No

<br />

### value

The current value of the option.

-   Type: `String`
-   Required: Yes

<br />

### onChange

A function that receives the new value. The value will be a string.

-   Type: `function`
-   Required: Yes

<br />

### options

Use options for different options.

-   Type: `Array`
-   Required: Yes

<br />

### isIcon

If want to use icon instead of label set it true. And use icon in icon property of options item (`{ label: __('Default', 'text-domain'), value: 'default', icon: your-icon }`).
Also can use dashicon like: `editor-aligncenter`

-   Type: `Boolean`
-   Required: No

<br />

### isTextIcon

If want to use text as icon set it true. And use text in icon property of options item (`{ label: __('Default', 'text-domain'), value: 'default', icon: 'DEFAULT' }`).

-   Type: `Boolean`
-   Required: No

<br />

### size

If want to use small size button group use `small` value.

-   Type: `String`
-   Required: No