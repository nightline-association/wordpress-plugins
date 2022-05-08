<?php

require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-functions.php';
require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-options.php';

function nla_im_add_settings_page() {
	add_options_page(
		'IM Embed settings',
		'IM Embed Settings',
		'manage_options',
		'nla-im-embed-menu',
		'nla_im_render_plugin_settings_page'
	);
}
add_action( 'admin_menu', 'nla_im_add_settings_page' );

function nla_im_render_plugin_settings_page() {
	?>
	<h2>IM Embed Settings</h2>
	<form action="options.php" method="post">
		<?php
		settings_fields( 'nla_im_embed_plugin_options' );
		do_settings_sections( 'nla_im_embed_plugin' );
		?>
		<input name="submit" class="button button-primary" type="submit" value="<?php esc_attr_e( 'Save' ); ?>" />
	</form>
	<?php
}

function nla_im_register_settings() {
	register_setting( 'nla_im_embed_plugin_options', 'nla_im_embed_plugin_options', 'nla_im_embed_plugin_options_validate' );
	add_settings_section( 'settings', 'Settings', 'nla_im_embed_plugin_section_text', 'nla_im_embed_plugin' );

	$options = nla_im_embed_config_options();
	foreach ( $options as $code => $option ) {
		add_settings_field(
			"nla_im_embed_plugin_setting_{$code}",
			$option['title'],
			'nla_im_embed_plugin_setting',
			$option['page'],
			$option['section'],
			array(
				'code'        => $code,
				'description' => $option['description'],
				'size'        => $option['size'] ?? null,
			)
		);
	}
}
add_action( 'admin_init', 'nla_im_register_settings' );

function nla_im_embed_plugin_options_validate( $input ) {
	$new_input = array();

	foreach ( array_keys( nla_im_get_options() ) as $key ) {
		$value             = trim( $input[ $key ] ?? '' );
		$new_input[ $key ] = $value ?: null;
	}

	if ( $new_input['base_url'] && substr( $new_input['base_url'], -1 ) !== '/' ) {
		$new_input['base_url'] .= '/';
	}

	return $new_input;
}

function nla_im_embed_plugin_section_text() {
	echo '<p>Here are the options for the NLA IM button plugin</p>';
}

function nla_im_embed_plugin_setting( $args ) {
	$code        = $args['code'] ?? null;
	$description = $args['description'] ?? null;
	$size        = $args['size'] ?? null;

	if ( $code ) {
		nla_im_text_field( $code, nla_im_get_options()[ $code ], $description, $size );
	}
}

function nla_im_text_field( $code, $value, $description = null, $size = 'regular' ) {
	echo esc_html(
		<<<HTML
		 <input
			id="nla_im_embed_plugin_setting_{$code}"
			name="nla_im_embed_plugin_options{$code}"
			type="text"
			value="{$value}"
			class="{$size}-text"
		 />
		HTML
	);

	if ( $description ) {
		echo esc_html( "<p id=\"base-url-description\" class=\"description\">{ $description }</p>" );
	}
}
