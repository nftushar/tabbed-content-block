# BDevice

BDevice is used to set value for responsive devices(desktop, tablet, mobile).


## Table of contents

1. [Usage](#usage)
2. [Options](#options)

<br />

## Usage

### block.json
Add an attribute in `block.json` file.

```json
"columns": {
	"type": "object",
	"default": {
		"desktop": 3,
		"tablet": 2,
		"mobile": 1
	}
}
```

<br />

### Settings.js

```jsx
import { BDevice, Label } from '../../Components';

const { columns } = attributes;

const [device, setDevice] = useState('desktop');

return <>
	<PanelRow>
		<Label className='mb5'>{__('Columns:', 'text-domain')}</Label>
		<BDevice device={device} onChange={val => setDevice(val)} />
	</PanelRow>
	<RangeControl value={columns[device]} onChange={val => setAttributes({ columns: { ...columns, [device]: val } })} min={1} max={6} step={1} beforeIcon='grid-view' />
</>
```

More props in [Options](#options).

<br />

## Options
### Props
Set this options as props of `<BDevice />` component that used in `Settings.js`.

<br />

### device

The current device of the state.

-   Type: `String`
-   Required: Yes
-   Default: desktop

<br />

### onChange

A function that receives the device value. The value will be an object.

-   Type: `function`
-   Required: Yes

<br />

### className

Use it to set any `className` fot the icon button.

-   Type: `String`
-   Required: No
-   Default: iconButton

<br />

### style

Use a custom style of the wrapper

-   Type: `Object`
-   Required: No