<?php

/**
 * JAIC_Core Class File
 *
 * This file contains the definition of the JAIC_Core class, which handles incoming
 * POST requests and performs corresponding actions. It validates and executes
 * methods dynamically based on the "action" parameter provided in the POST request.
 *
 * PHP version 7.0+
 *
 * @category Core
 * @package  JAIC\Classes
 * @author   Jotform <contact@jotform.com>
 * @license  Jotform <licence>
 * @link     https://www.jotform.com
 */

namespace JAIC\Classes;

use JAIC\Classes\JAIC_Request;

/**
 * Class JAIC_Core
 *
 * @category Core
 * @package  JAIC\Classes
 * @author   Jotform <contact@jotform.com>
 * @license  Jotform <licence>
 * @link     https://www.jotform.com
 *
 * Handles Core requests and actions.
 */
class JAIC_Core {
    private static $pluginName = "Jotform AI Chatbot";
    private static $pluginNamespace = "jotform_ai_chatbot";
    private static $pluginOptionKey = "jotform_ai_chatbot_options";
    private static $pluginKnowledgeBaseOptionKey = "jotform_ai_chatbot_knowledgebase";
    private static $getPluginPreviewModeKey = "jotform_ai_chatbot_preview";
    private static $serviceURLs = [
        "geu" => [
            "site" => "https://eu.jotform.com",
            "api"  => "https://eu-api.jotform.com"
        ],
        "hipaa" => [
            "site" => "https://hipaa.jotform.com",
            "api"  => "https://hipaa-api.jotform.com"
        ],
        "us" => [
            "site" => "https://www.jotform.com",
            "api"  => "https://api.jotform.com"
        ]
    ];
    private static $siteURL;
    private static $siteAPIURL;

    /**
     * JAIC_Core constructor.
     *
     * Checks the "action" parameter from the POST request and invokes
     * the corresponding method if it exists. If the method does not exist,
     * it returns a 400 error response.
     */
    public function __construct() {
        $this->setServiceURLs();

        // Validate request
        $nounce = isset($_POST["_nonce"]) ? sanitize_text_field(wp_unslash($_POST["_nonce"])) : false;
        if (wp_verify_nonce($nounce, "jotform-ai-chatbot")) {
            // Get action data
            $action = isset($_POST["action"]) ? sanitize_text_field(wp_unslash($_POST["action"])) : null;
            // Include required file for handling requests
            require_once __DIR__ . "/JAIC_Request.php";

            if (!empty($action) && is_string($action)) {
                // Check if the method exists in the current class
                if (method_exists($this, $action)) {
                    /**
                    * Check user authorization
                    */
                    add_action("wp_loaded", function () {
                        if (!current_user_can("manage_options")) {
                            wp_die(esc_html(__("You do not have sufficient permissions to access this page.", "jotform-ai-chatbot")));
                        }
                    });

                    // Call the method dynamically
                    $this->{$action}();
                    return;
                }

                // Return a 400 error response for invalid methods
                JAIC_Request::response400("Error! Invalid Method.");
            }
        }
    }

    /**
     * Checks if the application is running in preview mode.
     *
     * @return bool True if preview mode is enabled; otherwise, false.
     */
    public function isPreviewMode(): bool {
        $nounce = isset($_GET["_nonce"]) ? sanitize_text_field(wp_unslash($_GET["_nonce"])) : false;
        return (!empty($nounce) && wp_verify_nonce($nounce, "jotform-ai-chatbot") && isset($_GET[self::$getPluginPreviewModeKey])) ? sanitize_text_field(wp_unslash($_GET[self::$getPluginPreviewModeKey])) : false;
    }

    /**
     * Outputs the JotForm AI chatbot embed code if conditions are met.
     *
     * The method checks for preview mode or if the current page is configured
     * for displaying the chatbot. If valid, it renders the embed code inside a div.
     *
     * @return void
     */
    public function renderChatbot(): void {
        // Get the current page ID
        $pageID = get_the_ID();

        // Retrieve chatbot options from the WordPress settings
        $options = get_option(self::$pluginOptionKey);
        $options = !empty($options) ? json_decode($options, true) : [];

        // Check and format pages value
        $options["pages"] = !isset($options["pages"]) ? [] : ((!empty($options["pages"]) && is_string($options["pages"])) ? [$options["pages"]] : $options["pages"]);

        // Check if the chatbot should be displayed
        $isCustomURL = false;
        $requestedURI = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : false;
        $optionPageValue = (isset($options["pages"]) && is_array($options["pages"]) && !empty($options["pages"][0])) ? $options["pages"][0] : false;
        if (
            !empty($requestedURI) &&
            is_string($optionPageValue) &&
            (filter_var($optionPageValue, FILTER_VALIDATE_URL) !== false)
        ) {
            $parsedURL = parse_url($optionPageValue);
            $requestedURI = strstr($requestedURI, "?") ? strstr($requestedURI, "?", true) : $requestedURI;
            if (!empty($parsedURL["path"]) && strstr($requestedURI, $parsedURL["path"])) {
                $isCustomURL = true;
            }
        }

        if (
            $this->isPreviewMode() || $isCustomURL || (
                (isset($options["pages"]) && is_array($options["pages"])) &&
                (
                    (in_array($pageID, $options["pages"]) || in_array("all", $options["pages"])) ||
                    (is_single() && in_array("all-posts", $options["pages"])) ||
                    (is_category() && in_array("all-categories", $options["pages"]))
                )
            )
        ) {
            // Render the chatbot embed code if available
            if (isset($options["embed"]) && !empty($options["embed"])) {
                echo "<div id=\"ai-chatbot\">" . strip_tags(rawurldecode(base64_decode($options["embed"])), '<script>') . "</div>";
            }
        }
    }

    /**
     * Deletes the Jotform AI Chatbot configuration and performs cleanup.
     *
     * @param bool $isWPHook Indicates whether the deletion is triggered by a WordPress hook.
     */
    public function delete(bool $isWPHook = false): void {
        $apiKey = $this->getAPIKey();

        try {
            if (!empty($apiKey)) {
                // Construct the API endpoint URL for deleting the platform agent
                $url = $this->getSiteAPIURL() . "/ai-chatbot/delete-platform-agent/wordpress/" . urlencode($this->getDomain());

                // Request params
                $args = [
                    "method"    => "DELETE",
                    "headers"   => [
                        "Content-Type"  => "application/json",
                        "APIKEY" => $apiKey
                    ],
                    "timeout"   => 10
                ];

                // Make the request
                wp_remote_request($url, $args);
            }
        } catch (\Exception $e) {
        }

        if ($isWPHook) { // If the deletion is triggered by a WordPress hook
            // Delete the all chatbot options from the database
            delete_option(self::$pluginOptionKey);
            delete_option(self::$pluginKnowledgeBaseOptionKey);

            if (!empty($apiKey)) {
                // Construct the API endpoint URL for deleting the api key
                $url = $this->getSiteURL() . "/API/user/apps/" . $apiKey . "/delete";

                // Request params
                $args = [
                    "method"    => "POST",
                    "headers"   => [
                        "Content-Type"  => "application/json",
                        "APIKEY" => $apiKey,
                        "Referer" => $this->getSiteURL()
                    ],
                    "timeout"   => 10
                ];

                // Make the request
                wp_remote_request($url, $args);
            }
        } else {
            // Delete partial chatbot options from the database
            update_option(self::$pluginOptionKey, wp_json_encode([
                "apiKey" => (!empty($apiKey) ? $apiKey : "")
            ]));

            // Send a JSON response indicating successful deletion accordingly
            JAIC_Request::responseJSON(
                200,
                ["message" => self::$pluginName . " successfully deleted!"]
            );
        }
    }

    /**
     * Function to create knowledgebase of the site
     *
     * This function fetches the list of pages using the `getPages()` method, then iterates over each page to gather their URLs.
     * Only pages with a valid ID and a non-empty title are included in the knowledge base.
     * The URLs are sanitized using `esc_html()` to ensure they are safe for output.
     *
     * @param int $limit Indicates the max url count for knowledge base
     *
     * @return void
     */
    public function createKnowledgeBase(int $limit = 100) {
        $pages = $this->getPages();
        $categories = get_categories();

        $knowledgeBase = [];
        foreach ($pages as $page) {
            if (empty($page->ID) || empty($page->post_title)) {
                continue;
            }

            array_push($knowledgeBase, esc_html(get_permalink($page->ID)));
        }

        foreach ($categories as $category) {
            if (empty($category->term_id) || empty($category->name)) {
                continue;
            }

            array_push($knowledgeBase, esc_html(get_category_link($category->term_id)));
        }

        if (!empty($knowledgeBase)) {
            update_option(self::$pluginKnowledgeBaseOptionKey, wp_json_encode([
                "urls" => array_slice($knowledgeBase, 0, $limit)
            ]));
        }
    }

    /**
    * Retrieves the knowledge base from the plugin options.
    *
    * This function fetches the stored knowledge base data from the WordPress options table using the
    * plugin's unique key.
    *
    * @return array
    */
    private function getKnowledgeBase(): array {
        $knowledgeBase = get_option(self::$pluginKnowledgeBaseOptionKey);
        return (!is_string($knowledgeBase) || empty($knowledgeBase)) ? [] : json_decode($knowledgeBase, true);
    }

    /**
     * Update the Jotform AI Chatbot options.
     *
     * Update the related options from the database and sends a JSON response
     * indicating successful update.
     *
     * @param string $key The key of the AI Chatbot Plugin option
     * @param string $value The value of the AI Chatbot Plugin option
     *
     * @return void
     */
    private function update(string $key = "", string $value = ""): void {
        //Get Params
        $nounce = isset($_POST["_nonce"]) ? sanitize_text_field(wp_unslash($_POST["_nonce"])) : false;
        $optionKey = !empty($key) ? $key : ((wp_verify_nonce($nounce, "jotform-ai-chatbot") && isset($_POST["key"])) ? sanitize_text_field(wp_unslash($_POST["key"])) : "");
        $optionValue = !empty($value) ? $value : ((wp_verify_nonce($nounce, "jotform-ai-chatbot") && isset($_POST["value"])) ? sanitize_text_field(wp_unslash($_POST["value"])) : "");

        // Define valid option list
        $optionKeys = [
            "pages",
            "embed",
            "preview",
            "apiKey"
        ];

        if (empty($optionKey)) {
            JAIC_Request::response400("Error! Invalid parameters.");
        }
        $optionValue = empty($optionValue) ? "" : trim($optionValue);

        if (!is_string($optionKey) || !in_array($optionKey, $optionKeys)) {
            JAIC_Request::response403(
                "Error! You are not authorized to update this option key."
            );
        }

        // Get the chatbot options from the database
        $options = get_option(self::$pluginOptionKey);

        // Ensure it's an array
        $options = (!is_string($options) || empty($options)) ?
        [] : json_decode($options, true);

        // Validate key and its values
        if ($optionKey == "pages") {
            $optionValues = strstr($optionValue, ",") ? explode(",", $optionValue) : [$optionValue];
            $optionValue = array_map(
                function ($singleValue) {
                    $singleValue = is_string($singleValue)
                        ? trim($singleValue)
                        : $singleValue;

                    if (in_array($singleValue, ["all", "all-posts", "all-categories"]) || is_numeric($singleValue) || (filter_var($singleValue, FILTER_VALIDATE_URL) !== false)) {
                        return is_numeric($singleValue)
                            ? intval($singleValue)
                            : $singleValue;
                    }
                },
                $optionValues
            );

            $optionValue = array_filter($optionValue);
        } elseif ($optionKey == "embed") {
            $options["pages"] = ["all"];
        } elseif ($optionKey == "preview") {
            $optionKey = "embed";
            $options["pages"] = [];
        }

        // Add new option
        $options[$optionKey] = $optionValue;

        // Save updated options back to the database
        update_option(self::$pluginOptionKey, wp_json_encode($options));

        // Reset service urls according to user location
        if ($optionKey === "apiKey") {
            $this->setServiceURLs(true);
        }

        // Send a success response in JSON format
        JAIC_Request::responseJSON(
            200,
            [
                "message" => self::$pluginName . " successfully updated!",
                "data" => [
                    "PROVIDER_URL"      => $this->getSiteURL(),
                    "PROVIDER_API_URL"  => $this->getSiteAPIURL()
                ]
            ]
        );
    }

    /**
     * Creates the plugin settings and returns them in a JSON response.
     *
     * This function gathers the necessary settings for the plugin, including platform-specific details,
     * page information, and API credentials. It processes the available pages and determines which pages
     * are active based on the plugin configuration. The final settings are then packaged into an associative
     * array and returned in a JSON response with a success message.
     *
     * @return void
     */
    private function createSettings() {
        $pages = $this->getPages();
        $customPages = [
            ["text" => "All Category Pages", "value" => "all-categories"],
            ["text" => "All Blog Posts", "value" => "all-posts"],
            ["text" => "Custom URL", "value" => "", "selected" => "0"]
        ];

        $pluginActivePages = $this->getPluginActivePages();
        $isAllPagesSelected = (array_key_exists("none", $pluginActivePages)) ? "0" : ((empty($pluginActivePages) || (in_array("all", $pluginActivePages)) || ((count($pages) + count($customPages)) == count($pluginActivePages))) ? "1" : "0");
        $platformPages = [
            ["text" => "Entire Website", "value" => "all", "selected" => $isAllPagesSelected]
        ];

        foreach ($pages as $page) {
            if (empty($page->ID) || empty($page->post_title)) {
                continue;
            }

            $isPageSelected = (($isAllPagesSelected === "1") || in_array($page->ID, $pluginActivePages)) ? "1" : "0";
            array_push($platformPages, [
                "text" =>  esc_html($page->post_title),
                "value" => esc_html($page->ID),
                "selected" => esc_html($isPageSelected)
            ]);
        }

        foreach ($customPages as $customPage) {
            $isPageSelected = (($isAllPagesSelected === "1") || in_array($customPage["value"], $pluginActivePages)) ? "1" : "0";
            if (($customPage["text"] === "Custom URL") && count($pluginActivePages) === 1) {
                $value = array_pop($pluginActivePages);
                if (filter_var($value, FILTER_VALIDATE_URL) !== false) {
                    array_push($platformPages, [
                        "text" =>  esc_html($customPage["text"]),
                        "value" => $value,
                        "selected" => "1"
                    ]);

                    continue;
                }
            }

            array_push($platformPages, [
                "text" =>  esc_html($customPage["text"]),
                "value" => esc_html($customPage["value"]),
                "selected" => isset($customPage["selected"]) ? $customPage["selected"] : esc_html($isPageSelected)
            ]);
        }

        $settings = [
            "PLATFORM"                => "wordpress",
            "PLATFORM_PAGES"          => $platformPages,
            "PLATFORM_KNOWLEDGE_BASE" => $this->getKnowledgeBase(),
            "PLATFORM_API_URL"        => $this->getPlatformAPIURL(),
            "PLATFORM_DOMAIN"         => $this->getDomain(),
            "PLATFORM_PAGE_CONTENTS"  => $this->getPageContents(),
            "PLATFORM_PREVIEW_URL"    => $this->getPreviewURL(),
            "PROVIDER_API_KEY"        => $this->getAPIKey(),
            "PROVIDER_URL"            => $this->getSiteURL(),
            "PROVIDER_API_URL"        => $this->getSiteAPIURL()
        ];

        JAIC_Request::responseJSON(
            200,
            [
                "data" => $settings,
                "message" => self::$pluginName . " settings successfully created!"
            ]
        );
    }

    /**
     * Retrieves the plugin name
     *
     * @return string The Jotform AI Chatbot plugin name string value.
     */
    private function getPluginName(): string {
        return self::$pluginName;
    }

    /**
     * Retrieves the plugin namespace value
     *
     * @return string The Jotform AI Chatbot plugin namespace string value.
     */
    private function getPluginNamespace(): string {
        return self::$pluginNamespace;
    }

    /**
     * Retrieves the plugin DB option key name value
     *
     * @return string The Jotform AI Chatbot plugin DB option key string value.
     */
    private function getPluginOptionKey(): string {
        return self::$pluginOptionKey;
    }

    /**
     * Retrieves the domain of the current home URL.
     *
     * @return string The domain portion of the home URL.
     */
    private function getDomain(): string {
        return wp_parse_url(home_url(), PHP_URL_HOST);
    }

    /**
     * Returns the appropriate Jotform API URL.
     *
     * @return string The Jotform API URL.
     */
    private function getSiteAPIURL(): string {
        return self::$siteAPIURL;
    }

    /**
     * Returns the appropriate Jotform website URL.
     *
     * @return string The Jotform website URL.
     */
    private function getSiteURL(): string {
        return self::$siteURL;
    }

    /**
     * Function to set Service URLS
     *
     * @param bool $forceUserRegionCheck
     *
     * @return string The Jotform website URL.
     */
    private function setServiceURLs(bool $forceUserRegionCheck = false) {
        // Retrieve chatbot options from the WordPress settings
        $options = get_option(self::$pluginOptionKey);
        $options = !empty($options) ? json_decode($options, true) : [];

        self::$siteURL = self::$serviceURLs["us"]["site"];
        self::$siteAPIURL = self::$serviceURLs["us"]["api"];

        if (!$forceUserRegionCheck) {
            // Check user region settings
            $region = (isset($options["region"]) && in_array($options["region"], array_keys(self::$serviceURLs))) ? $options["region"] : false;
            if (!empty($region)) {
                if (in_array($region, ["geu", "hipaa"])) {
                    self::$siteURL = self::$serviceURLs[$region]["site"];
                    self::$siteAPIURL = self::$serviceURLs[$region]["api"];
                }
                return;
            }
        }

        // Check user location
        $response = wp_remote_request($this->getSiteAPIURL() . "/user/", [
            "method"    => "GET",
            "headers"   => [
                "Content-Type"  => "application/json",
                "APIKEY" => $this->getAPIKey()
            ],
            "timeout"   => 10
        ]);

        if (!is_wp_error($response)) {
            $statusCode = wp_remote_retrieve_response_code($response);
            if ($statusCode == 200) {
                $response = wp_remote_retrieve_body($response);
                $response = json_decode($response, true);
                if (!empty($response["location"]) && strstr($response["location"], "https://eu-api.jotform.com")) {
                    self::$siteURL = self::$serviceURLs["geu"]["site"];
                    self::$siteAPIURL = self::$serviceURLs["geu"]["api"];

                    // Update user region settings
                    $options["region"] = "geu";
                    update_option(self::$pluginOptionKey, wp_json_encode($options));
                    return;
                } elseif (!empty($response["location"]) && strstr($response["location"], "https://hipaa-api.jotform.com")) {
                    self::$siteURL = self::$serviceURLs["hipaa"]["site"];
                    self::$siteAPIURL = self::$serviceURLs["hipaa"]["api"];

                    // Update user region settings
                    $options["region"] = "hipaa";
                    update_option(self::$pluginOptionKey, wp_json_encode($options));
                    return;
                }

                // Update user region settings
                $options["region"] = "us";
                update_option(self::$pluginOptionKey, wp_json_encode($options));
                return;
            }
        }

        $response = wp_remote_request((self::$siteAPIURL . '/user/location'), [
            'method'  => 'GET',
            'timeout' => 10,
        ]);

        if (is_wp_error($response)) {
            return;
        }

        $statusCode = wp_remote_retrieve_response_code($response);
        if ($statusCode !== 200) {
            return;
        }

        $location = wp_remote_retrieve_body($response);
        if (empty($location)) {
            return;
        }

        $location = json_decode($location, true);
        $excludedCountries = [];
        if (json_last_error() === JSON_ERROR_NONE && $location['responseCode'] === 200 && is_array($location['content']) && $location['content']['continent_code'] === 'EU' && !in_array($location['content']['country_code'], $excludedCountries)) {
            self::$siteURL = self::$serviceURLs["geu"]["site"];
            self::$siteAPIURL = self::$serviceURLs["geu"]["api"];

            // Update user region settings
            $options["region"] = "geu";
            update_option(self::$pluginOptionKey, wp_json_encode($options));
            return;
        }

        // Update user region settings
        $options["region"] = "us";
        update_option(self::$pluginOptionKey, wp_json_encode($options));
    }

    /**
     * Returns the appropriate Platform Plugin API URL based on the current domain.
     *
     * @return string The Platform plugin API URL.
     */
    public function getPlatformAPIURL(): string {
        return get_site_url() . "/wp-admin/admin.php?page=" . self::$pluginNamespace;
    }

    /**
     * Returns the plugin preview mode url
     *
     * @return string The Jotform AI Chatbot Plugin preview mode url.
     */
    private function getPreviewURL(): string {
        return get_site_url() . "?" . self::$getPluginPreviewModeKey . "=1";
    }

    /**
     * Retrieves the API key for the chatbot from the WordPress settings.
     *
     * This function fetches the stored chatbot options from the WordPress
     * settings, decodes them into an array, and checks if an API key exists.
     * If a valid API key is found, it is returned; otherwise, an empty string
     * is returned.
     *
     * @return string The API key if available, or an empty string if not.
     */
    private function getAPIKey(): string {
        // Retrieve chatbot options from the WordPress settings
        $options = get_option(self::$pluginOptionKey);
        $options = !empty($options) ? json_decode($options, true) : [];

        // Return the API Key If already generated
        if (isset($options["apiKey"]) && !empty($options["apiKey"])) {
            return $options["apiKey"];
        }

        return "";
    }

    /**
     * Retrieves the page list for the chatbot from the WordPress settings.
     *
     * This function fetches the stored chatbot options from the WordPress
     * settings, decodes them into an array, and checks if an pages key exists.
     * If a valid pages key is found, it is returned; otherwise, an empty array
     * is returned.
     *
     * @return array The page list if available, or an empty array if not.
     */
    private function getPluginActivePages(): array {
        // Retrieve chatbot options from the WordPress settings
        $options = get_option(self::$pluginOptionKey);
        $options = !empty($options) ? json_decode($options, true) : [];

        // Return the empty forced list
        if (isset($options["pages"]) && empty($options["pages"])) {
            return ["none" => "forced"];
        }

        // Return the page list
        if (isset($options["pages"]) && !empty($options["pages"])) {
            return $options["pages"];
        }

        return [];
    }

    /**
     * Retrieves the content of all published pages in WordPress and formats it into a structured array.
     *
     * This function queries the WordPress database to fetch page titles and content for all published pages.
     *
     * @global $wpdb WordPress database abstraction object.
     * @return array An array where the keys are page IDs, and the values are arrays containing 'title' and 'content'.
     */
    private function getPageContents() {
        $knowledge_base = [];

        try {
            // Arguments to fetch published pages
            $args = [
                "post_type"      => "page",
                "post_status"    => "publish",
                "numberposts"    => 10
            ];

            $pages = get_posts($args);
            if (!empty($pages)) {
                foreach ($pages as $page) {
                    $knowledge_base["pages"][] = [
                        "title"   => esc_html($page->post_title),
                        "content" => esc_html($page->post_content)
                    ];
                }
            }
        } catch (\Exception $e) {
            $knowledge_base["pages"] = [];
        }

        return $knowledge_base;
    }

    /**
     * Retrieves and sorts all pages by their IDs.
     *
     * This function fetches all pages using the `get_pages()` function
     * and sorts them in ascending order based on their ID.
     *
     * @return array An array of page objects sorted by ID.
     */
    private function getPages() {
        $pages = get_pages();
        if (empty($pages) || !is_array($pages)) {
            return [];
        }

        $pages = array_slice($pages, 0, 100);
        usort($pages, function ($a, $b) {
            return $a->ID <=> $b->ID;
        });

        return $pages;
    }
}
