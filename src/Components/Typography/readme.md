# Typography

Typography is used to set element typography(Font Family, Font Weight, Font Size, Font Style, Text Transform, Text Decoration, Line Height, Letter Space).


## Table of contents

1. [Usage](#usage)
2. [Options](#options)

<br />

## Usage

### block.json
Add an attribute in `block.json` file.

```json
"typography": {
	"type": "object",
	"default": {
		"fontSize": 16
	}
}
```

<br />

### Settings.js

```jsx
import produce from 'immer';

import { Typography } from '../../Components';

const { typography } = attributes;

return <Typography label={__('Label', 'text-domain')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: 16 }} produce={produce} />
```

More props in [Options](#options).

<br />

### Style.js
```jsx
import { getTypoCSS } from '../../Components/utils/getCSS';

const { typography } = attributes;

<style  dangerouslySetInnerHTML={{
__html: `
	${getTypoCSS('', typography)?.googleFontLink}
	${getTypoCSS('selector', typography)?.styles}
`
}}/>
```

<br />

### style.php
In order to use typography object in `php`. You have to create a function like `getTypoCSS`.

```php
function generateCss( $value, $cssProperty ) {
	return !$value ? '' : "$cssProperty: $value;";
}

function getTypoCSS( $selector, $typo, $isFamily = true ) {
	extract( $typo );
	$fontFamily = $fontFamily ?? 'Default';
	$fontCategory = $fontCategory ?? 'sans-serif';
	$fontVariant = $fontVariant ?? 400;
	$fontWeight = $fontWeight ?? 400;
	$isUploadFont = $isUploadFont ?? true;
	$fontSize = $fontSize ?? [ 'desktop' => 15, 'tablet' => 15, 'mobile' => 15 ];
	$fontStyle = $fontStyle ?? 'normal';
	$textTransform = $textTransform ?? 'none';
	$textDecoration = $textDecoration ?? 'auto';
	$lineHeight = $lineHeight ?? '135%';
	$letterSpace = $letterSpace ?? '0px';

	$isEmptyFamily = !$isFamily || !$fontFamily || 'Default' === $fontFamily;
	$desktopFontSize = $fontSize['desktop'] ?? $fontSize;
	$tabletFontSize = $fontSize['tablet'] ?? $desktopFontSize;
	$mobileFontSize = $fontSize['mobile'] ?? $tabletFontSize;

	$styles = ( $isEmptyFamily ? '' : "font-family: '$fontFamily', $fontCategory;" )
		. self::generateCss( $fontWeight, 'font-weight' )
		. 'font-size: '. $desktopFontSize .'px;'
		. self::generateCss( $fontStyle, 'font-style' )
		. self::generateCss( $textTransform, 'text-transform' )
		. self::generateCss( $textDecoration, 'text-decoration' )
		. self::generateCss( $lineHeight, 'line-height' )
		. self::generateCss( $letterSpace, 'letter-spacing' );

	// Google font link
	$linkQuery = ( !$fontVariant || 400 === $fontVariant ) ? '' : ( '400i' === $fontVariant ? ':ital@1' : ( false !== strpos( $fontVariant, '00i' ) ? ': ital, wght@1, '. str_replace( '00i', '00', $fontVariant ) .' ' : ": wght@$fontVariant " ) );

	$link = $isEmptyFamily ? '' : 'https://fonts.googleapis.com/css2?family='. str_replace( ' ', '+', $fontFamily ) ."$linkQuery&display=swap";

	return [
		'googleFontLink' => !$isUploadFont || $isEmptyFamily ? '' : "@import url( $link );",
		'styles' => preg_replace( '/\s+/', ' ', trim( "
			$selector{ $styles }
			@media (max-width: 768px) {
				$selector{ font-size: $tabletFontSize" . "px; }
			}
			@media (max-width: 576px) {
				$selector{ font-size: $mobileFontSize" . "px; }
			}
		" ) )
	];
}
```

And use in a style tag in `php`.
```php
<?php
extract( $attributes );

ob_start(); ?>
<style>
	<?php
		echo GetCSS::getTypoCSS( '', $typography )['googleFontLink'];
		echo GetCSS::getTypoCSS( "selector", $typography )['styles'];
	?>
</style>
<?php return ob_get_clean();
```

<br />

## Options
### Props
Set this options as props of `<Typography />` component that used in `Settings.js`.

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

### isFamily

If don't want to use font family, set it to `false`.

**Note**: if set `false`, also use in `getTypoCSS` function like `getTypoCSS(selector, typography, false)?.styles`.

-   Type: `Boolean`
-   Required: No

<br />

### produce

This component using produce function from immer.

-   Type: `Function`
-   Required: Yes