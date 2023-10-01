# BColor

BColor is used to set element color.


## Table of contents

1. [Usage](#usage)
2. [Options](#options)

<br />

## Usage

### block.json
Add an attribute in `block.json` file.

```json
"color": {
	"type": "string",
	"default": "#0000"
}
```

<br />

### Settings.js

```jsx
import { BColor } from '../../Components';

const { color } = attributes;

return <BColor label={__('Label', 'text-domain')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#0000' />
```

More props in [Options](#options).

<br />

### Style.js
```jsx
const { color } = attributes;

<style  dangerouslySetInnerHTML={{
__html: `
	selector{
		color: ${color};
	}
`
}}/>
```

<br />

### style.php
In order to use color in `php`. Use in a style tag.
```php
<?php
extract( $attributes );

ob_start(); ?>
<style>
	selector{
		color: <php echo esc_html( $color ); ?>;
	}
</style>
<?php return ob_get_clean();
```

<br />

## Options
### Props
Set this options as props of `<BColor />` component that used in `Settings.js`.

<br />

### className

Use it to set any `className`.

-   Type: `String`
-   Required: No

<br />

### label

Use a custom label for color component

-   Type: `String`
-   Required: No

<br />

### value

The current value of the color.

-   Type: `String`
-   Required: Yes

<br />

### onChange

A function that receives the new value. The value will be an string.

-   Type: `function`
-   Required: Yes

<br />

### defaultColor

Use defaults value to give option for reset the value.

-   Type: `String`
-   Required: No