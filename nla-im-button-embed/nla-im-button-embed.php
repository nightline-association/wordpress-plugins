<?php
/**
Plugin Name:  NLA IM Button Embed Plugin
Plugin URI:   https://nightline.ac.uk
Description:  Enables easy embedding of IM buttons onto WordPress sites.
Version:      0.2.1
Author:       Nightline Association
Author URI:   https://nightline.ac.uk
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 */

define( 'NLA_TOOLS__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'NLA_TOOLS__PLUGIN_VER', '0.2.1' );

require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-functions.php';
require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-shortcodes.php';

if ( ( defined( 'WP_CLI' ) && WP_CLI ) || is_admin() ) {
	require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-admin.php';
}
