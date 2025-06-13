<?php

/**
* Plugin Name: AI Chatbot for WordPress - Jotform
* Plugin URI: http://wordpress.org/plugins/jotform-ai-chatbot/
* Description: Create a custom AI chatbot to engage visitors, answer FAQs, provide customer support, and generate leads — no coding needed.
* Author: Jotform
* License: GPLv2 or later
* License URI: https://www.gnu.org/licenses/gpl-2.0.html
* Version: 2.2.9
* Author URI: https://www.jotform.com/
*/

/**
 * Add plugin to WP menu
 *
 * Creates a new menu entry for the plugin in the WordPress admin dashboard.
 */
function jotform_ai_chatbot_plugin_options_page() {
    add_menu_page(
        "Jotform AI Chatbot",
        "Jotform AI Chatbot",
        "manage_options",
        "jotform_ai_chatbot",
        "jotform_ai_chatbot_render_plugin",
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImN1cnJlbnRDb2xvciIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjY2NyAxMi4zMTFhMi41MTUgMi41MTUgMCAwIDEgMC0zLjU3M0w5LjcgMi43NGEyLjU1NSAyLjU1NSAwIDAgMSAzLjU5NyAwIDIuNTE1IDIuNTE1IDAgMCAxIDAgMy41NzRMNy4yNjMgMTIuMzFhMi41NTUgMi41NTUgMCAwIDEtMy41OTcgMFptOS40NyA1LjM3NWEyLjUxNSAyLjUxNSAwIDAgMCAwIDMuNTc0IDIuNTU1IDIuNTU1IDAgMCAwIDMuNTk4IDBsMy41ODQtMy41NjJhMi41MTUgMi41MTUgMCAwIDAgMC0zLjU3MyAyLjU1NSAyLjU1NSAwIDAgMC0zLjU5NyAwbC0zLjU4NSAzLjU2MVpNNy40NjcgMjJjLjUzNiAwIC44MDMtLjYyNy40MjUtLjk5M0wzLjkzNSAxNy4xN2MtLjM3OC0uMzY2LTEuMDI1LS4xMDgtMS4wMjUuNDEydjMuMjUzYzAgLjY0Mi41MzkgMS4xNjQgMS4yIDEuMTY0aDMuMzU3Wm0xLjEzMS04Ljk4OGEyLjUxNSAyLjUxNSAwIDAgMCAwIDMuNTc0IDIuNTU1IDIuNTU1IDAgMCAwIDMuNTk3IDBsOC4xNTItOC4wOThhMi41MTUgMi41MTUgMCAwIDAgMC0zLjU3NCAyLjU1NSAyLjU1NSAwIDAgMC0zLjU5NyAwbC04LjE1MiA4LjA5OFoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
    );
}
add_action("admin_menu", "jotform_ai_chatbot_plugin_options_page");

/**
 * Initialize Plugin Settings
 *
 * Registers plugin settings and settings sections.
 */

function jotform_ai_chatbot_initialize_plugin($action) {
    // Construct the API endpoint URL to initialize settings on Jotform side
    $url = "https://api.jotform.com/ai-chatbot/installment";
    $domain = rawurlencode(wp_parse_url(home_url(), PHP_URL_HOST));

    // Payload
    $payload = [
        "platform" => "wordpress",
        "domain"   => $domain,
        "action"   => $action
    ];

    // Request params
    $args = [
        "method"    => "POST",
        "body"      => wp_json_encode($payload),
        "headers"   => [
            "Content-Type" => "application/json"
        ]
    ];

    // Add the API Key if already generated
    $options = get_option("jotform_ai_chatbot_options");
    $options = !empty($options) ? json_decode($options, true) : [];
    if (isset($options["apiKey"]) && !empty($options["apiKey"])) {
        $args["headers"]["APIKEY"] = $options["apiKey"];
    }

    // Make the request
    wp_remote_request($url, $args);
}

function jotfotm_ai_plugin_activation($plugin) {
    if ($plugin === plugin_basename(__FILE__)) {
        jotform_ai_chatbot_initialize_plugin('activated');
    }
}

add_action('activated_plugin', 'jotfotm_ai_plugin_activation');

function jotfotm_ai_plugin_deactivation($plugin) {
    if ($plugin === plugin_basename(__FILE__)) {
        jotform_ai_chatbot_initialize_plugin('deactivated');
    }
}

add_action('deactivated_plugin', 'jotfotm_ai_plugin_deactivation');

function jotfotm_ai_plugin_uninstallation($plugin) {
    if ($plugin === plugin_basename(__FILE__)) {
        jotform_ai_chatbot_initialize_plugin('uninstalled');
    }
}

register_uninstall_hook(__FILE__, 'jotfotm_ai_plugin_uninstallation');

function jotfotm_ai_plugin_updating($upgrader_object, $options) {
    if ($options['action'] === 'update' && $options['type'] === 'plugin') {
        $plugin_basename = plugin_basename(__FILE__);
        foreach ($options['plugins'] as $plugin) {
            if ($plugin === $plugin_basename) {
                jotform_ai_chatbot_initialize_plugin('updated');
                break;
            }
        }
    }
}

add_action('upgrader_process_complete', 'jotfotm_ai_plugin_updating', 10, 2);

function jotform_ai_chatbot_plugin_settings_init() {
    // Ensure only authorized users can access the page.
    add_action("wp_loaded", function () {
        if (!current_user_can("manage_options")) {
            wp_die(esc_html(__("You do not have sufficient permissions to access this page.", "jotform-ai-chatbot")));
        }
    });

    register_setting(
        'jotform_ai_chatbot',
        'jotform_ai_chatbot_options',
        [
            'type'              => 'array',
            'sanitize_callback' => 'jotform_ai_chatbot_sanitize_options',
        ]
    );
    add_settings_section(
        "",
        esc_html(__("Jotform AI Chatbot", "jotform-ai-chatbot")),
        "jotform_ai_chatbot_developers_callback",
        "jotform_ai_chatbot",
        [
            "before_section" => "<div class=\"jfpChatbot-plugin-section\">",
            "after_section" => "</div>"
        ]
    );
}

// Hook to initialize settings during the admin interface setup.
add_action("admin_init", "jotform_ai_chatbot_plugin_settings_init");

/**
 * Sanitize Plugin Options
 *
 * Sanitizes the plugin options to ensure that only valid values are stored in the database.
 *
 * @param array|string $input The input value to sanitize.
 * @return array|string The sanitized input value.
 */
function jotform_ai_chatbot_sanitize_options($input) {
    if (is_array($input)) {
        foreach ($input as $key => $value) {
            $input[$key] = sanitize_text_field($value);
        }
    } else {
        $input = sanitize_text_field($input);
    }
    return $input;
}

/**
 * Render Plugin
 *
 * Displays the plugin's settings page in the admin dashboard.
 */
function jotform_ai_chatbot_render_plugin() {
    global $jaic_core;
    $jaic_core->createKnowledgeBase();
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <div><?php do_settings_sections("jotform_ai_chatbot"); ?></div>
    </div>
    <?php
}

/**
 * Displays a visual indicator for plugin preview mode.
 *
 * This function checks if the plugin is enabled via URL query parameters or session variables.
 * If enabled, it adds custom styles and a notification bar at the top of the page.
 */
function jotform_ai_chatbot_show_preview_indicator() {
    global $jaic_core;
    global $jaic_assetVersion;

    if ($jaic_core->isPreviewMode()) {
        wp_enqueue_style(
            "preview-mode-style",
            plugin_dir_url(__FILE__) . "lib/css/preview.css",
            [],
            $jaic_assetVersion
        );

        echo "<div class=\"plugin_preview_indicator_container\">";
        echo esc_html(__("You are in Jotform AI Chatbot Preview Mode.", "jotform-ai-chatbot"));
        echo "</div>";
    }
}


// Hooks the `jotform_ai_chatbot_show_preview_indicator` function into the `wp_head` action.
// This ensures that the plugin preview indicator styles and notification bar are added to the <head> section of every page.
// The `wp_head` action is triggered by WordPress just before the closing </head> tag in a theme's template.
add_action("wp_head", "jotform_ai_chatbot_show_preview_indicator");

/**
 * Defines the `jotform_ai_chatbot_show_plugin` function to display the plugin.
 * Uses the global `$jaic_core` object to call the `renderChatbot()` method and outputs the plugin's HTML content.
 * Hooks the `jotform_ai_chatbot_show_plugin` function into the `wp_footer` action to ensure the plugin is added to the footer of the webpage.
 * The `wp_footer` action is triggered just before the closing </body> tag in a theme's template, making it a suitable place for rendering the plugin.
 */
function jotform_ai_chatbot_show_plugin() {
    try {
        global $jaic_core;
        $jaic_core->renderChatbot();
    } catch (\Exception $e) {
    }
}

// Hooks the `jotform_ai_chatbot_show_plugin` function to the `wp_footer` action.
// This ensures that the plugin is displayed in the footer section of the website by calling the `jotform_ai_chatbot_show_plugin` function when WordPress renders the footer.
// The `wp_footer` action is executed just before the closing </body> tag in the HTML, which is a common place for adding JavaScript or other content to the page.
add_action("wp_footer", "jotform_ai_chatbot_show_plugin");

// Hook the function to register plugin
function jotform_ai_chatbot_register_plugin() {
    try {
        // Include required files for handling core functionality
        require_once __DIR__ . "/classes/JAIC_Core.php";

        // Initialize the JAIC_Core object for managing base functionalities.
        global $jaic_core;
        $jaic_core = new JAIC\Classes\JAIC_Core([
            "checkUserRegion" => true
        ]);

        // Initialize the asset version
        global $jaic_assetVersion;
        $jaic_assetVersion = "2.2.9";
    } catch (\Exception $e) {
    }
}

// Hook the function to the plugins_loaded action.
add_action("plugins_loaded", "jotform_ai_chatbot_register_plugin");

/**
 * Callback Function for Developers Section
 *
 * Renders the plugin interface within the WordPress admin settings page.
 * Initializes JavaScript environment variables required for the plugin.
 */
function jotform_ai_chatbot_developers_callback($args) {
    global $jaic_core;
    global $jaic_assetVersion;

    // Set Page WP Nounce Fields
    wp_nonce_field("jotform-ai-chatbot", "_nonce");

    // for moment js
    wp_enqueue_script('wp-date');

    // Register to load plugin settings page assets
    $isDevEnv = isset($_SERVER["SERVER_NAME"]) && $_SERVER["SERVER_NAME"] === "localhost";
    $buildDir = $isDevEnv ? "dist" : "lib";
    wp_enqueue_script("plugin-script", plugin_dir_url(__FILE__) . "{$buildDir}/app/app.js", [], $jaic_assetVersion, true);
    wp_enqueue_style("plugin-css", plugin_dir_url(__FILE__) . "{$buildDir}/app/app.css", [], $jaic_assetVersion, "all");

    wp_enqueue_script("plugin-preloader-script", plugin_dir_url(__FILE__) . "lib/admin.js", [], $jaic_assetVersion, true);
    wp_enqueue_style("plugin-preloader-css", plugin_dir_url(__FILE__) . "lib/css/admin.css", [], $jaic_assetVersion, "all");

    // Temporary ui issue fix for the plugin conflicts
    echo '<link rel="stylesheet" href="' . plugin_dir_url(__FILE__) . $buildDir . "/app/app.css?ver=" . $jaic_assetVersion . '">';

    ?>
    <input type="hidden" id="platform_api_url" name="platform_api_url" value="<?php echo esc_html($jaic_core->getPlatformAPIURL()); ?>" />
    <div id="jfpChatbot-app">
        <div class="jfLoader-wrapper">
            <div class="jfLoader"></div>
            <strong>Jotform AI Chatbot wizard is loading...</strong>
        </div>
    </div>
    <?php
}
