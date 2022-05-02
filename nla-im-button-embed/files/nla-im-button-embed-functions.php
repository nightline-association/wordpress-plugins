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

require_once( NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-options.php' );

function nla_im_get_options()
{
    $storedOptions = get_option( 'nla_im_embed_plugin_options' );
    $configOptions = nla_im_embed_config_options();
    $returnOptions = [];

    foreach ($configOptions as $code => $option) {
        $returnOptions[$code] = esc_attr($storedOptions[$code] ?? $option['default']);
    }

    return $returnOptions;
}