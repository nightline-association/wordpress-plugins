<?php

require_once( NLA_TOOLS__PLUGIN_DIR . 'nla-im-button-embed-functions.php' );

function nla_im_button_embed_shortcode($atts = [], $content = null, $tag = '')
{
    // normalize attribute keys, lowercase
    $atts = array_change_key_case( (array) $atts, CASE_LOWER );

    // override default attributes with user attributes
    $atts = shortcode_atts(
        array(
            'im-code' => null,
            'align' => "left",
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
            if (property_exists($data, 'away') && $data->away) {
                return "<div class='nla-im-embed-away has-text-align-{$atts['align']}'>{$options['away_text']}</div>";
            } else {
                return "<form action='{$baseUrl}/chats' class='wp-block-buttons nla-im-embed-open' method='POST' target='_blank'>
    <div class='wp-block-button'>
        <input class='wp-block-button__link nla-im-embed-open-chat-btn' type='submit' value='{$options['open_text']}'/>
    </div>
</form>";
            }
        } else {
            return "<div class='nla-im-embed-closed has-text-align-{$atts['align']}'>{$options['closed_text']}</div>";
        }
    }
}
add_shortcode('im_embed_btn', 'nla_im_button_embed_shortcode');
