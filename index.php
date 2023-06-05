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

		ob_start(); ?>
		<div class='<?php echo esc_attr($blockClassName); ?>' id='tcbTabbedContent-<?php echo esc_attr($cId); ?>' data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'>

		<?php echo ("
			           <style>   
								#tcbTabbedContent-$cId .tabMenu {
									padding: " . esc_attr(implode(' ', $tabsPadding)) . ";
								}
								#tcbTabbedContent-$cId .tabMenu li{" .
									esc_attr($this->getColorsCSS($tabColors))
								. "}
								#tcbTabbedContent-$cId .tabMenu li.active {" .
									esc_attr($this->getColorsCSS($tabActiveColors))
								. "}
								#tcbTabbedContent-$cId .tabMenu li .menuIcon i{
									font-size: " . esc_attr($icon['size']) . ";
									color: " . esc_attr($icon['color']) . ";
								}
								#tcbTabbedContent-$cId .tabMenu li.active .menuIcon i{
									color: " . esc_attr($icon['activeColor']) . ";
								}
					
								#tcbTabbedContent-$cId .tabContent {" .
									esc_attr($this->getBackgroundCSS($contentBG))
									. "}

				        </style>"); ?>

			<div class='tcbTabbedContent'>
				<ul class='tabMenu'>
					<?php foreach ($tabs as $index => $tab) {
						extract($tab);

						$iconEl = isset($icon['class']) ? "<span class='menuIcon'><i class='" . esc_attr($icon["class"]) . "'></i></span>" : '';

						$iconStyles = isset($icon['color']) || isset($icon['gradient']) ? esc_attr($this->getIconCSS($icon, false)) : '';
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
								<?php echo esc_html($title); ?>
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
