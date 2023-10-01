<?php
class TabContentTab extends TabContent {
	public function __construct() {
		add_action( 'init', [ $this, 'onInit' ] );
	}

	function onInit() {
		register_block_type( __DIR__, [
			'render_callback' => [ $this, 'render' ]
		] ); // Register Block
	}

	function render( $attributes, $content ) {
		$cId = isset( $attributes['cId'] ) ? sanitize_text_field( $attributes['cId'] ) : '';

		ob_start(); ?>
		<div class='wp-block-tcb-tab' id='tcbTabContentTab-<?php echo esc_attr( $cId ); ?>'>
			<?php echo wp_kses_post( $content ); ?>
		</div>

		<?php return ob_get_clean();
	}
}
new TabContentTab();
