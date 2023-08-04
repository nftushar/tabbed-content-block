<?php
/**
 * Plugin Name: Tabbed Content- New
 * Description: Create tabbed sections in WordPress for organized content and improved user engagement.
 * Version: 1.0.1
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: tabbed-content
 */

// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}

// Constant
define('TCB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0');
define('TCB_ASSETS_DIR', plugin_dir_url(__FILE__) . 'assets/');

require_once(__DIR__ . '/tab/block.php');

// Tabbed Content
class TabbedContent {
	function __construct() {
		add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
		add_action('init', [$this, 'onInit']);
	}

	function getIconCSS($icon, $isSize = true, $isColor = true) {
		extract($icon);
		$fontSize = $fontSize ?? 16;
		$colorType = $colorType ?? 'solid';
		$color = $color ?? 'inherit';
		$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';

		$colorCSS = 'gradient' === $colorType ?
			"color: transparent; background-image: $gradient; -webkit-background-clip: text; background-clip: text;" :
			"color: $color;";

		$styles = '';
		$styles .= !$fontSize || !$isSize ? '' : "font-size: " . esc_attr($fontSize) . "px;";
		$styles .= $isColor ? $colorCSS : '';

		return $styles;
	}

	function getColorsCSS($colors) {
		extract($colors);
		$color = $color ?? '#333';
		$bgType = $bgType ?? 'solid';
		$bg = $bg ?? '#0000';
		$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';

		$background = $bgType === 'gradient' ? $gradient : $bg;

		$styles = '';
		$styles .= $color ? "color: " . esc_attr($color) . ";" : '';
		$styles .= ($gradient || $bg) ? "background: " . esc_attr($background) . ";" : '';

		return $styles;
	}

	function getBackgroundCSS($bg, $isSolid = true, $isGradient = true, $isImage = true) {
		extract($bg);
		$type = $type ?? 'solid';
		$color = $color ?? '#F5F0BB';
		$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';
		$image = $image ?? [];
		$position = $position ?? 'center center';
		$attachment = $attachment ?? 'initial';
		$repeat = $repeat ?? 'no-repeat';
		$size = $size ?? 'cover';
		$overlayColor = $overlayColor ?? '#F5F0BB';

		$gradientCSS = $isGradient ? "background: " . esc_attr($gradient) . ";" : '';

		$imgUrl = $image['url'] ?? '';
		$imageCSS = $isImage ? "background: url(" . esc_url($imgUrl) . "); background-color: " . esc_attr($overlayColor) . "; background-position: " . esc_attr($position) . "; background-size: " . esc_attr($size) . "; background-repeat: " . esc_attr($repeat) . "; background-attachment: " . esc_attr($attachment) . "; background-blend-mode: overlay;" : '';

		$solidCSS = $isSolid ? "background: " . esc_attr($color) . ";" : '';

		$styles = 'gradient' === $type ? $gradientCSS : ('image' === $type ? $imageCSS : $solidCSS);

		return $styles;
	}

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
			. $this->generateCss( $fontWeight, 'font-weight' )
			. 'font-size: '. $desktopFontSize .'px;'
			. $this->generateCss( $fontStyle, 'font-style' )
			. $this->generateCss( $textTransform, 'text-transform' )
			. $this->generateCss( $textDecoration, 'text-decoration' )
			. $this->generateCss( $lineHeight, 'line-height' )
			. $this->generateCss( $letterSpace, 'letter-spacing' );
	
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

	function enqueueBlockAssets() {
		wp_register_style('fontAwesome', TCB_ASSETS_DIR . 'css/fontawesome.min.css', [], '6.4.0'); // Font Awesome
	}

	function onInit() {
		wp_register_style('tcb-tabs-style', plugins_url('dist/style.css', __FILE__), ['fontAwesome'], TCB_PLUGIN_VERSION); // Style
		wp_register_style('tcb-tabs-editor-style', plugins_url('dist/editor.css', __FILE__), [], TCB_PLUGIN_VERSION); // Backend Style

		register_block_type(__DIR__, [
			'editor_style' => 'tcb-tabs-editor-style',
			'style' => 'tcb-tabs-style',
			'render_callback' => [$this, 'render']
		]); // Register Block

		wp_set_script_translations('tcb-tabs-editor-script', 'tabbed-content', plugin_dir_path(__FILE__) . 'languages'); // Translate
	}

	function render($attributes, $content) {
		extract($attributes);

		$className = isset($className) ? esc_attr($className) : '';
		$blockClassName = 'wp-block-tcb-tabs ' . $className . ' align' . esc_attr($align);
//veriable for commom  css clss/id  
		$mainSl = "#tcbTabbedContent-$cId";
		$tabMenuSl = "$mainSl .tabMenu";

		$styles = $this->getTypoCSS( '', $typography )['googleFontLink']
		. $this->getTypoCSS( "selector", $typography )['styles']
		. " $tabMenuSl {
			padding: ". implode(' ', $tabsPadding) .";
		}
		$tabMenuSl li{".
			$this->getColorsCSS($tabColors)
		."}
		$tabMenuSl li.active {".
			$this->getColorsCSS($tabActiveColors)
		."}
		$tabMenuSl li .menuIcon i{
			font-size: ". $icon['size'] .";
			color: ". $icon['color'] .";
		}
		$tabMenuSl li.active .menuIcon i{
			color: ". $icon['activeColor'] .";
		}
		$mainSl .tabContent {".
			$this->getBackgroundCSS($contentBG)
		."}";

		ob_start(); ?>
		<div class='<?php echo esc_attr($blockClassName); ?>' id='tcbTabbedContent-<?php echo esc_attr($cId); ?>' data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'>

		<style>
			<?php echo esc_html( $styles ); ?>
		</style>



			<div class='tcbTabbedContent'>
				<ul class='tabMenu'>
					<?php foreach ($tabs as $index => $tab) {
						extract($tab);

						$iconEl = isset($icon['class']) ? "<span class='menuIcon'><i class='" . esc_attr($icon["class"]) . "'></i></span>" : '';

						$iconStyles = isset($icon['color']) || isset($icon['gradient']) ? $this->getIconCSS($icon, false) : '';
					?>
						<li id='menuItem-<?php echo esc_attr($clientId); ?>'>
							<style>
								<?php echo esc_html("
								#tcbTabbedContent-$cId .tabMenu #menuItem-$clientId .menuIcon i{
									$iconStyles
								}
								"); ?>
							</style>

							<?php echo wp_kses_post($iconEl); ?>

							<span class='tabLabel'>
								<?php echo wp_kses_post($title); ?>
							</span>
						</li>
					<?php } ?>
				</ul>

				<div class='tabContent'>
					<?php echo wp_kses_post($content); ?>
				</div>
			</div>
		</div>
		<?php return ob_get_clean();
	} // Render

}
new TabbedContent();
