<?php
/**
 * Plugin Name: Tabbed Content- New
 * Description: Create tabbed sections in WordPress for organized content and improved user engagement.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: tabbed-content
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'TCB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'TCB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

require_once(__DIR__.'/tab/block.php');

// Tabbed Content
class TabbedContent{
	function __construct(){
		add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
		add_action( 'init', [$this, 'onInit'] );
	}


	function getIconCSS( $icon, $isSize = true, $isColor = true ) {
		extract( $icon );
		$fontSize = $fontSize ?? 16;
		$colorType = $colorType ?? 'solid';
		$color = $color ?? 'inherit';
		$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';
	
		$colorCSS = 'gradient' === $colorType ?
			"color: transparent; background-image: $gradient; -webkit-background-clip: text; background-clip: text;" :
			"color: $color;";
	
		$styles = '';
		$styles .= !$fontSize || !$isSize ? '' : "font-size: $fontSize" . "px;";
		$styles .= $isColor ? $colorCSS : '';
	
		return $styles;
	}


	function enqueueBlockAssets(){
		wp_register_style( 'fontAwesome', TCB_ASSETS_DIR . 'css/fontawesome.min.css', [], '6.4.0' ); // Font Awesome
	}

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

	function getBackgroundCSS( $bg, $isSolid = true, $isGradient = true, $isImage = true ) {
		extract( $bg );
		$type = $type ?? 'solid';
		$color = $color ?? '#F5F0BB';
		$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';
		$image = $image ?? [];
		$position = $position ?? 'center center';
		$attachment = $attachment ?? 'initial';
		$repeat = $repeat ?? 'no-repeat';
		$size = $size ?? 'cover';
		$overlayColor = $overlayColor ?? '#F5F0BB';

		$gradientCSS = $isGradient ? "background: $gradient;" : '';

		$imgUrl = $image['url'] ?? '';
		$imageCSS = $isImage ? "background: url($imgUrl); background-color: $overlayColor; background-position: $position; background-size: $size; background-repeat: $repeat; background-attachment: $attachment; background-blend-mode: overlay;" : '';

		$solidCSS = $isSolid ? "background: $color;" : '';

		$styles = 'gradient' === $type ? $gradientCSS : ( 'image' === $type ? $imageCSS : $solidCSS );

		return $styles;
	}


	function onInit() {
		wp_register_style( 'tcb-tabs-style', plugins_url( 'dist/style.css', __FILE__ ), [ 'fontAwesome' ], TCB_PLUGIN_VERSION ); // Style
		wp_register_style( 'tcb-tabs-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [], TCB_PLUGIN_VERSION ); // Backend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'tcb-tabs-editor-style',
			'style'				=> 'tcb-tabs-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'tcb-tabs-editor-script', 'tabbed-content', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes, $content ){

		extract( $attributes );
		$className = $className ?? '';
		$blockClassName = 'wp-block-tcb-tabs ' . $className . ' align' . $align;

		ob_start();
		// echo"<pre>"
		// print_r($attributes)
		?>
	

		<div class='<?php echo esc_attr( $blockClassName ); ?>' id='wp-block-tcb-tabs-<?php echo esc_attr( $cId ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'>
			<style>
				#tcbTabbedContent-<?php echo esc_attr( $cId ); ?>{
				}
			</style>
<?php
		 echo "<style>
				
		
				#tcbTabbedContent-$cId .tabMenu {
					padding: " . implode(' ', $padding) . ";
				}

				#tcb-innerBlock-$cId {".
					 $this->getBackgroundCSS ($contentBackgroundColor)
				."}

				#wp-block-tcb-tabs-$cId .tcbTabbedContent .tabMenu li {".
					 $this->getColorsCSS($tabColors)
				."}

				#wp-block-tcb-tabs-$cId .tcbTabbedContent .tabMenu li.active {".
					 $this->getColorsCSS($tabActiveColors)
				."}
			</style>";
 ?>


			<div class='tcbTabbedContent' id='tcbTabbedContent-<?php echo esc_attr( $cId ); ?>'>
				<ul class='tabMenu'>
					
				<?php foreach( $tabs as $index => $tab ){
					
					extract( $tab );
					$iconEl = $icon ? "<i class='" . $icon["class"] . "'></i>" : '';
					$mediaEl = 'icon' === $mediaType ? $iconEl : $imgEl;
				?>

					<li id='tcbTabbedContent-icon-<?php echo esc_attr( $clientId ); ?>'>
						<?php echo wp_kses_post( $mediaEl ); ?>

						<span class='tabLabel'><?php echo wp_kses_post( $title ); ?></span>
					</li>
					
				<?php } ?>

				

					
				</ul>
				<?php foreach( $tabs as $index => $tab ){
					extract( $tab );?>


					<style>
							<?php
							echo "#tcbTabbedContent-icon-$clientId i {".
								$this->getIconCSS($icon)
							."}"
							?>
				    </style>
				<?php } ?>
			<div class='tcb-innerBlock' id='<?php echo "tcb-innerBlock-$cId"?>'>
					<?php echo wp_kses_post( $content ); ?>
				</div>
			</div>
		</div>
		<?php return ob_get_clean();
	} // Render
}
new TabbedContent();