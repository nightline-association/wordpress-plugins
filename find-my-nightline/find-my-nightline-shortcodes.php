<?php
/**
 * Find My Nightline Shortcodes
 *
 * @package NightlineAssociation/FindMyNightline
 */

require_once NLA_FIND_MY_NIGHTLINE__PLUGIN_DIR . 'find-my-nightline-functions.php';

/**
 * Return the shortcode that bootstraps the Find My Nightline Vue component.
 *
 * @return string
 */
function find_my_nightline_embed_shortcode() {
	$nightlines = get_nightlines();

	if ( ! empty( $nightlines ) ) {
		$nightlines = wp_json_encode( $nightlines );

		return <<<HTML
		<script>
		window.nightlines = {$nightlines}
		</script>
		<div id="app"></div>
		HTML;
	}

	return 'Error: Unable to establish a connection to Portal.';
}

add_shortcode( 'find_my_nightline', 'find_my_nightline_embed_shortcode' );

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_script(
			'find_my_nightline_script',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'dist/assets/js/main.js',
			array(),
			NLA_FIND_MY_NIGHTLINE__PLUGIN_VER,
			array(
				'in_footer' => true,
			),
		);

		wp_enqueue_style(
			'find_my_nightline_style',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'dist/assets/css/style.css',
			array(),
			NLA_FIND_MY_NIGHTLINE__PLUGIN_VER,
		);
	}
);

add_filter(
	'script_loader_tag',
	function ( $tag, $handle, $src ) {
		if ( 'find_my_nightline_script' !== $handle ) {
			return $tag;
		}

		// Change the script tag by adding type="module" and return it.
		// phpcs:ignore
		return '<script type="module" src="' . esc_url( $src ) . '"></script>';
	},
	10,
	3
);
