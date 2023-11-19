# Nightline Association WordPress Plugins

---

## Instant Messaging Button Embed (Plugin)

You can use this plugin to allow people visiting your WordPress website to see when your IM service is open, and when it is open, allow them to start a new chat with you.

### Requirements
- **Access to your WordPress Admin and plugin page**, so that you can install the plugin.
- **The code for an IM space on the Nightline Portal**. For instance, the code for `https://portal.nightline.ac.uk/im/demo` in the URL to your IM space would be `demo`.

### Setting it up
1. Download the latest version of `nla-im-button-embed.zip` from the [**NLA IM Button Embed Plugin**, listed under 'Assets', from the Releases page](https://github.com/nightline-association/wordpress-plugins/releases).
2. Log into the **Admin** panel of your WordPress website.
3. On the menu bar, click **Plugins**.
4. On the plugins page, click **Add New**, and then **Upload Plugin**.
5. Upload the `nla-im-button-embed.zip` file, and then click **Install Now**.
6. Once the plugin hs been installed, click **Activate Now**.

### Add the button to your website
1. Log into the **Admin** panel of your WordPress website.
2. Navigate to the page you want to add the IM button to, and click **Edit Page**.
3. Click the **+** button in the top-left corner, and search the block list for **Shortcode**, and drag it to where you want it on the page.
4. To the Shortcode block, add the text: `[im_embed_btn im-code="YOUR_CODE"]`, replacing `YOUR_CODE` with the code to the IM space you want to link to.
5. Click **Update** in the top-right corner to publish the page.

### Customising your embed

#### IM Embed Settings
You can access the IM Embed Settings page in the WordPress Dashboard by going to **Settings** and selecting **IM Embed Settings**.

- **Base URL**: if you're using the Nightline Portal, you should leave this box blank.
- **IM open text**: you can change the text that appears on the embed button when your IM space is open.
- **IM closed text**: you can change the text that's shown when your IM space is closed.

#### Style changes

- You can customise the alignment (left, right or center) of the embed by adding `align="left"`, `align="right"` or `align="center"` to your shortcode. For instance, `[im_embed_btn im-code="YOUR_CODE" align="center"]`.

## License

GNU General Public License, version 2 (GPL-2)
