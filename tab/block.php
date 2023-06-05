<?php
class TabbedContentTab extends TabbedContent{
	public function __construct(){
		add_action( 'init', [$this, 'onInit'] );
	}

	function onInit(){
		register_block_type( __DIR__, [
			'render_callback' => [$this, 'render']
		] ); // Register Block
	}

	function render( $attributes, $content ){
		extract( $attributes );
		ob_start(); ?>
		<div class='wp-block-tcb-tab' id='tcbTabbedContentTab-<?php echo esc_attr( $cId ); ?>'>
			<?php echo wp_kses_post( $content ); ?>
		</div>

		<?php return ob_get_clean();
	}
}
new TabbedContentTab();