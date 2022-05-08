<?php

require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-options.php';

function nla_im_get_options() {
	$stored_options = get_option( 'nla_im_embed_plugin_options' );
	$config_options = nla_im_embed_config_options();
	$return_options = array();

	foreach ( $config_options as $code => $option ) {
		$return_options[ $code ] = esc_attr( $stored_options[ $code ] ?? $option['default'] );
	}

	return $return_options;
}
