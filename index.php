<?php
/**
 * Plugin Name: Tabbed Content
 * Description: Create tabbed sections in WordPress for organized content and improved user engagement.
 * Version: 1.0.0
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

	// ... Other functions remain unchanged ...

	function render($attributes, $content) {
		extract($attributes);

		$className = isset($className) ? esc_attr($className) : '';
		$blockClassName = 'wp-block-tcb-tabs ' . $className . ' align' . esc_attr($align);

		$styles = "
			". $this->getTypoCSS('', $typography)['googleFontLink'] .
			$this->getTypoCSS("selector", $typography)['styles'] "
		";

		ob_start();
		?>
		<div class='<?php echo esc_attr($blockClassName); ?>' id='tcbTabbedContent-<?php echo esc_attr($cId); ?>' data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'>
			<style>
				<?php
				echo $this->getTypoCSS('', $typography)['googleFontLink'];
				echo $this->getTypoCSS("selector", $typography)['styles'];
				?>

				#tcbTabbedContent-<?php echo esc_attr($cId); ?> .tabMenu {
					padding: <?php echo esc_html(implode(' ', $tabsPadding)); ?>;
				}

				#tcbTabbedContent-<?php echo esc_attr($cId); ?> .tabMenu li{
					<?php echo esc_html($this->getColorsCSS($tabColors)); ?>
				}

				#tcbTabbedContent-<?php echo esc_attr($cId); ?> .tabMenu li.active {
					<?php echo esc_html($this->getColorsCSS($tabActiveColors)); ?>
				}

				#tcbTabbedContent-<?php echo esc_attr($cId); ?> .tabMenu li .menuIcon i{
					font-size: <?php echo esc_html($icon['size']); ?>;
					color: <?php echo esc_html($icon['color']); ?>;
				}

				#tcbTabbedContent-<?php echo esc_attr($cId); ?> .tabMenu li.active .menuIcon i{
					color: <?php echo esc_html($icon['activeColor']); ?>;
				}

				#tcbTabbedContent-<?php echo esc_attr($cId); ?> .tabContent {
					<?php echo esc_html($this->getBackgroundCSS($contentBG)); ?>
				}
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
		<?php
		return ob_get_clean();
	} // Render

}

new TabbedContent();
