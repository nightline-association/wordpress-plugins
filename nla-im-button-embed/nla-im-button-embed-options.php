<?php

function nla_im_embed_config_options() {
    return [
        'base_url' => [
            'title' => 'Base URL',
            'page' => 'nla_im_embed_plugin',
            'section' => 'settings',
            'default' => null,
            'description' => 'The URL that should be used to check for the IM status. Leave blank to use the default.',
            'size' => 'regular',
        ],
        'open_text' => [
            'title' => 'IM open text',
            'page' => 'nla_im_embed_plugin',
            'section' => 'settings',
            'default' => 'Start chat',
            'description' => 'The text that appears on the button when the IM Space is open.',
            'size' => 'regular',
        ],
        'closed_text' => [
            'title' => 'IM closed text',
            'page' => 'nla_im_embed_plugin',
            'section' => 'settings',
            'default' => 'This service is currently closed, please check back again later.',
            'description' => 'The text that appears when the IM Space is closed.',
            'size' => 'large',
        ],
    ];
}
