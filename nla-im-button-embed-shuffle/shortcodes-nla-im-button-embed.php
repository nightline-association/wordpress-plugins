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

require_once( NLA_TOOLS__PLUGIN_DIR . 'functions-nla-im-button-embed.php' );

function nla_im_button_embed_shortcode($atts = [], $content = null, $tag = '')
{
    // normalize attribute keys, lowercase
    $atts = array_change_key_case( (array) $atts, CASE_LOWER );

    // override default attributes with user attributes
    $atts = shortcode_atts(
        array(
            'im-code' => null,
        ), $atts, $tag
    );

    if (!($imCode = $atts['im-code'])) {
        return '<div style="color:red;">No IM Instance provided!</div>';
    }

    $options = nla_im_get_options();
    $baseUrl = $options['base_url'] ?: 'https://portal.nightline.ac.uk/im/';
    $baseUrl = "{$baseUrl}{$imCode}";

    $response = wp_remote_get("{$baseUrl}?format=json");
    if ($body = wp_remote_retrieve_body($response)) {
        $data = json_decode($body);

        if (!$data) {
            return '<div style="color:red;">Error checking the status of the IM service!</div>';
        }

        if ($data->open) {
            return "<form action='{$baseUrl}/chats' class='wp-block-buttons' method='POST' target='_blank'>
    <div class='wp-block-button'>
        <input class='wp-block-button__link' type='submit' value='{$options['open_text']}'/>
    </div>
</form>";
        } else {
            return "<div>{$options['closed_text']}</div>";
        }
    }
}
add_shortcode('im_embed_btn', 'nla_im_button_embed_shortcode');