<?php

require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-functions.php';

/** @throws \JsonException */
function nla_im_button_embed_shortcode( $atts = array(), $content = null, $tag = '' ) {
	 // Normalize attribute keys, lowercase.
	$atts = array_change_key_case( (array) $atts );

	// Override default attributes with user attributes.
	$atts = shortcode_atts(
		array(
			'im-code' => null,
			'align'   => 'left',
		),
		$atts,
		$tag
	);

	$im_code = $atts['im_code'];

	if ( ! ( $im_code ) ) {
		return '<div style="color:red;">No IM Instance provided!</div>';
	}

	$options  = nla_im_get_options();
	$base_url = $options['base_url'] ?: 'https://portal.nightline.ac.uk/im/';
	$base_url = "{$base_url}{$im_code}";

	$response = wp_remote_get( "{$base_url}?format=json" );
	$body     = wp_remote_retrieve_body( $response );

	if ( $body ) {
		$data = json_decode( $body, false, 512, JSON_THROW_ON_ERROR );

		if ( ! $data ) {
			return '<div style="color:red;">Error checking the status of the IM service!</div>';
		}

		if ( $data->open ) {
			if ( property_exists( $data, 'away' ) && $data->away ) {
				return "<div class='nla-im-embed-away has-text-align-{$atts['align']}'>{$options['away_text']}</div>";
			}

			return <<<HTML
				<form action='{$base_url}/chats' class='wp-block-buttons nla-im-embed-open' method='POST' target='_blank'>
					<div class='wp-block-button'>
						<input class='wp-block-button__link nla-im-embed-open-chat-btn' type='submit' value='{$options['open_text']}'/>
					</div>
				</form>
				HTML;
		}

		return "<div class='nla-im-embed-closed has-text-align-{$atts['align']}'>{$options['closed_text']}</div>";
	}

	return '';
}
add_shortcode( 'im_embed_btn', 'nla_im_button_embed_shortcode' );
