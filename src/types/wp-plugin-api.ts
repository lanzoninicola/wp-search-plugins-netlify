export interface WpPluginAPIResponse {
  info: {
    // The current page of the response.
    page: number;
    // The total number of pages
    pages: number;
    // total number of plugins
    results: number;
  };
  plugins: WpPlugin[];
}

export interface WpPlugin {
  // The plugin's name.
  name: string;
  // The plugin's slug.
  slug: string;
  // Plugin version (eg. 5.5.6.1)
  version: string;
  // Markup of the plugin's author.
  author: string;
  // URL of the author
  author_profile: string;
  // The wordpress version that the plugin requires (eg. "5.7")
  requires: string;
  // The wordpress version that the plugin has been tested (eg. "6.0")
  tested: string;
  // PHP version required by the plugin (eg. "5.6") or boolean false if not specified.
  requires_php: boolean | string;
  // Score attribuited by WP.org (I think) to the plugin
  rating: number;
  // details of rating
  ratings: WpPluginRatings;
  // the number of times the plugin has been rated.
  num_ratings: number;
  // total number of support thread resolved
  support_threads: number;
  // number of support thread resolved
  support_threads_resolved: number;
  // number of active installations
  active_installs: number;
  // number of times the plugin has been downloaded
  downloaded: number;
  // date of last updated (YYYY-MM-DD hh:mm A)
  last_updated: string;
  // date of addition to wordpress.org (YYYY-MM-DD)
  added: string;
  // webiste url of the plugin
  homepage: string;
  // short description in plain string
  short_description: string;
  // markup content of description
  description: string;
  // url of the plugin's download
  download_link: string;
  // plugin's tags
  tags: {
    [key: string]: string;
  };
  // url of the plugin's donation page
  donate_link: string;
  // urls of the plugin's thumbnail
  icons: WpPluginIcons;
}

export interface WpPluginRatings {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

// urls of the plugin's thumbnail
export interface WpPluginIcons {
  "1x"?: string;
  "2x"?: string;
  svg?: string;
}
