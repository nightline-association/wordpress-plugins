<?php
/**
 * Embed IM button functions.
 *
 * @package NLA_IM_Embed
 */

require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-options.php';

/**
 * Validate the settings for the IM Embed plugin.
 *
 * @return array<string, string> The validated settings.
 */
function nla_im_get_options() {
	$stored_options = get_option( 'nla_im_embed_plugin_options' );
	$config_options = nla_im_embed_config_options();
	$return_options = array();

	foreach ( $config_options as $code => $option ) {
		$return_options[ $code ] = esc_attr( $stored_options[ $code ] ?? $option['default'] );
	}

	return $return_options;
}
