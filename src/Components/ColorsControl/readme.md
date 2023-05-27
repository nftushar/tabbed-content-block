# ColorsControl

ColorsControl is used to set element color(solid, background).


## Table of contents

1. [Usage](#usage)
2. [Options](#options)

<br />

## Usage

### block.json
Add an attribute in `block.json` file.

```json
"colors": {
	"type": "object",
	"default": {
		"color": "#333",
		"bg": "#0000"
	}
}
```

<br />

### Settings.js

```jsx
import { ColorsControl } from '../../Components';

const { colors } = attributes;

return <ColorsControl value={colors} onChange={val => setAttributes({ colors: val })} defaults={{ color: '#333', bg: '#0000' }} />
```

More props in [Options](#options).

<br />

### Style.js
```jsx
import { getColorsCSS } from '../../Components/utils/getCSS';

const { colors } = attributes;

<style  dangerouslySetInnerHTML={{
__html: `
	selector{
		${getColorsCSS(colors)}
	}
`
}}/>
```

<br />

### style.php
In order to use colors object in `php`. You have to create a function like `getColorsCSS`.

```php
function getColorsCSS( $colors ) {
	extract( $colors );
	$color = $color ?? '#333';
	$bgType = $bgType ?? 'solid';
	$bg = $bg ?? '#0000';
	$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';

	$background = $bgType === 'gradient' ? $gradient : $bg;

	$styles = '';
	$styles .= $color ? "color: $color;" : '';
	$styles .= ( $gradient || $bg ) ? "background: $background;" : '';

	return $styles;
}
```

And use in a style tag in `php`.
```php
<?php
extract( $attributes );

ob_start(); ?>
<style>
	selector{
		<php echo esc_html( getColorsCSS( $colors ) ); ?>
	}
</style>
<?php return ob_get_clean();
```

<br />

## Options
### Props
Set this options as props of `<ColorsControl />` component that used in `Settings.js`.

<br />

### className

Use it to set any `className`.

-   Type: `String`
-   Required: No

<br />

### label

Use a custom label for colors component

-   Type: `String`
-   Required: No

<br />

### value

The current value of the colors.

-   Type: `Object`
-   Required: Yes

<br />

### onChange

A function that receives the new value. The value will be an object.

-   Type: `function`
-   Required: Yes

<br />

### defaults

Use defaults value to give option for reset the value.

-   Type: `Object`
-   Required: No