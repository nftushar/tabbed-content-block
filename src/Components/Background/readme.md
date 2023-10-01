# Background

Background is used to set element background(solid, gradient, and image).


## Table of contents

1. [Usage](#usage)
2. [Options](#options)

<br />

## Usage

### block.json
Add an attribute in `block.json` file.

```json
"background": {
	"type": "object",
	"default": {
		"color": "#0000"
	}
}
```

<br />

### Settings.js

```jsx
import { Background } from '../../Components';

const { background } = attributes;

return <Background label={__('Label', 'text-domain')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#000' }} />
```

More props in [Options](#options).

<br />

### Style.js
```jsx
import { getBackgroundCSS } from '../../Components/utils/getCSS';

const { background } = attributes;

<style  dangerouslySetInnerHTML={{
__html: `
	selector{
		${getBackgroundCSS(background)}
	}
`
}}/>
```

<br />

### style.php
In order to use background object in `php`. You have to create a function like `getBackgroundCSS`.

```php
function getBackgroundCSS( $bg, $isSolid = true, $isGradient = true, $isImage = true ) {
	extract( $bg );
	$type = $type ?? 'solid';
	$color = $color ?? '#000000b3';
	$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';
	$image = $image ?? [];
	$position = $position ?? 'center center';
	$attachment = $attachment ?? 'initial';
	$repeat = $repeat ?? 'no-repeat';
	$size = $size ?? 'cover';
	$overlayColor = $overlayColor ?? '#000000b3';

	$gradientCSS = $isGradient ? "background: $gradient;" : '';

	$imgUrl = $image['url'] ?? '';
	$imageCSS = $isImage ? "background: url($imgUrl); background-color: $overlayColor; background-position: $position; background-size: $size; background-repeat: $repeat; background-attachment: $attachment; background-blend-mode: overlay;" : '';

	$solidCSS = $isSolid ? "background: $color;" : '';

	$styles = 'gradient' === $type ? $gradientCSS : ( 'image' === $type ? $imageCSS : $solidCSS );

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