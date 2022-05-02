<?php
/*
Plugin Name:  NLA IM Button Embed Plugin
Plugin URI:   https://nightline.ac.uk
Description:  Enables easy embedding of IM buttons onto wordpress sites.
Version:      0.1
Author:       Geoff Jukes
Author URI:   https://nightline.ac.uk
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
*/

define( 'NLA_TOOLS__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

require_once( NLA_TOOLS__PLUGIN_DIR . 'functions-nla-im-button-embed.php' );
require_once( NLA_TOOLS__PLUGIN_DIR . 'shortcodes-nla-im-button-embed.php' );

if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
    require_once( NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-admin.php' );
}