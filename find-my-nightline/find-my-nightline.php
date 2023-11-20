<?php
/**
 * NLA Find My Nightline Plugin
 *
 * @package NightlineAssociation/FindMyNightline
 * @author  Nightline Association
 * @license GPL2
 *
 * @wordpress-plugin
 * Plugin Name:  NLA Find My Nightline Plugin
 * Plugin URI:   https://www.github.com/nightline-association/wordpress-plugins
 * Description:  Find Nightlines by the names of the institutions that they cover.
 * Version:      0.1.0
 * Author:       Nightline Association
 * Author URI:   https://www.nightline.ac.uk
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 */

define( 'NLA_FIND_MY_NIGHTLINE__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'NLA_FIND_MY_NIGHTLINE__PLUGIN_VER', '0.1.0' );

if ( ! function_exists( 'add_action' ) ) {
	echo "Hello! I'm just a plugin. Not much I can do when called directly.";
	exit();
}

require_once NLA_FIND_MY_NIGHTLINE__PLUGIN_DIR . 'find-my-nightline-functions.php';
require_once NLA_FIND_MY_NIGHTLINE__PLUGIN_DIR . 'find-my-nightline-shortcodes.php';
