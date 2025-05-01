<?php
/**
 * Plugin Name:  Portal IM Button Embed Plugin
 * Plugin URI:   https://www.github.com/ThreeRingsCIC/portal-wordpress-plugins
 * Description:  Enables easy embedding of IM buttons onto WordPress sites.
 * Version:      0.2.3
 * Author:       Three Rings CIC
 * Author URI:   https://www.threerings.org.uk
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package NLA_IM_Embed
 */

define( 'NLA_TOOLS__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'NLA_TOOLS__PLUGIN_VER', '0.2.3' );

if ( ! function_exists( 'add_action' ) ) {
	echo "Hello! I'm just a plugin. Not much I can do when called directly.";
	exit();
}

require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-functions.php';
require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-shortcodes.php';

if ( ( defined( 'WP_CLI' ) && WP_CLI ) || is_admin() ) {
	require_once NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-admin.php';
}
