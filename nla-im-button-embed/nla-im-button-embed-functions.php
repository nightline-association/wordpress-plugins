<?php

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