# BorderControl

BorderControl is used to set element border and border radius.


## Table of contents

1. [Usage](#usage)
2. [Options](#options)

<br />

## Usage

### block.json
Add an attribute in `block.json` file.

```json
"border": {
	"type": "object",
	"default": {
		"radius": "5px"
	}
}
```

<br />

### Settings.js

```jsx
import { BorderControl } from '../../Components';

const { border } = attributes;

return <BorderControl label={__('Border:', 'text-domain')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
```

More props in [Options](#options).

<br />

### Style.js
```jsx
import { getBorderCSS } from '../../Components/utils/getCSS';

const { border } = attributes;

<style  dangerouslySetInnerHTML={{
__html: `
	selector{
		${getBorderCSS(border)}
	}
`
}}/>
```

<br />

### style.php
In order to use background object in `php`. You have to create a function like `getBorderCSS`.

```php
function getBorderCSS( $border ) {
	extract( $border );
	$width = $width ?? '0px';
	$style = $style ?? 'solid';
	$color = $color ?? '#0000';
	$side = $side ?? 'all';
	$radius = $radius ?? '0px';

	$borderSideCheck = function( $s ) use ( $side ) {
		$bSide = strtolower( $side );
		return false !== strpos( $bSide, 'all' ) || false !== strpos( $bSide, $s );
	};

	$noWidth = $width === '0px' || !$width;
	$borderCSS = "$width $style $color";

	$styles = '';
	foreach ( ['top', 'right', 'bottom', 'left'] as $s ) {
		if ( !$noWidth && $borderSideCheck( $s ) ) { $styles .= "border-$s: $borderCSS;"; }
	}
	if ( $radius ) { $styles .= "border-radius: $radius;"; }

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
		<php echo esc_html( getBackgroundCSS( $background ) ); ?>
	}
</style>
<?php return ob_get_clean();
```

<br />

## Options
### Props
Set this options as props of `<Background />` component that used in `Settings.js`.

<br />

### className

Use it to set any `className`.

-   Type: `String`
-   Required: No

<br />

### label

Use a custom label for background component

-   Type: `String`
-   Required: No

<br />

### value

The current value of the background.

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

<br />

### isSolid

If don't want to use solid background, set it to `false`.

**Note**: if set `false`, also use in `getBackgroundCSS` function like `getBackgroundCSS(background, false)`.

-   Type: `Boolean`
-   Required: No

<br />

### isGradient

If don't want to use gradient background, set it to `false`.

**Note**: if set `false`, also use in `getBackgroundCSS` function like `getBackgroundCSS(background, true, false)`.

-   Type: `Boolean`
-   Required: No

<br />

### isImage

If don't want to use image background, set it to `false`.

**Note**: if set `false`, also use in `getBackgroundCSS` function like `getBackgroundCSS(background, true, true, false)`.

-   Type: `Boolean`
-   Required: No