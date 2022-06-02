// https://api.wordpress.org/plugins/info/1.2/?action=query_plugins
// https://github.com/marketplace/actions/http-request-action
// https://jasonet.co/posts/scheduled-actions/
// https://prismatic-yeot-e7f71f.netlify.app/.netlify/functions/wp-search-plugins-api

// TODO: Develop an error class to handle the error

import { Handler } from "@netlify/functions";
import { WpPlugin } from "../../types";
import getWordpressPluginsAPI from "../../factories/wp-plugins-api";
import SupabaseService from "../../lib/supabase/supabase-service";

const handler: Handler = async (event, context) => {
  // const supabaseService = new SupabaseService();

  // let currentPage = 1;
  // // let allPlugins: WpPlugin[] = [];

  // const wpPluginsAPI = getWordpressPluginsAPI();
  // const pluginsResponse = await wpPluginsAPI.findPaginated({
  //   page: currentPage,
  // });

  // if (!pluginsResponse.ok) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(pluginsResponse.payload),
  //   };
  // }
  // const { payload } = pluginsResponse;

  // const response = await supabaseService.addBulk(payload["plugins"]);

  // console.log(response);

  // if (!response.ok) {
  //   return {
  //     statusCode: 500,
  //   };
  // }

  return {
    statusCode: 200,
  };

  // // const totPages: number = payload["info"]["pages"];
  // let plugins: WpPlugin[] = payload["plugins"] || [];
  // const totPages = 2;
  // while (currentPage <= totPages) {
  //   const pluginsResponse = await wpPluginsAPI.findPaginated({
  //     page: currentPage,
  //     perPage: 10,
  //   });
  //   if (!pluginsResponse.ok) {
  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify(pluginsResponse.payload),
  //     };
  //   }
  //   const { payload } = pluginsResponse;
  //   let plugins: WpPlugin[] = payload["plugins"] || [];
  //   allPlugins = [...allPlugins, ...plugins];
  //   currentPage++;
  // }
};

export { handler };
