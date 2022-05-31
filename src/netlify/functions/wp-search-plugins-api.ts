// https://api.wordpress.org/plugins/info/1.2/?action=query_plugins
// https://github.com/marketplace/actions/http-request-action
// https://jasonet.co/posts/scheduled-actions/
// https://prismatic-yeot-e7f71f.netlify.app/.netlify/functions/wp-search-plugins-api

import { Handler } from "@netlify/functions";
import { WpPlugin } from "../../types";
import firestoreService from "../../lib/firebase/firestore-service";
import getWordpressPluginsAPI from "../../factories/wp-plugins-api";

const handler: Handler = async (event, context) => {
  const wpPluginsAPI = getWordpressPluginsAPI();

  const pluginsResponse = await wpPluginsAPI.findPaginated({
    page: 1,
  });

  if (!pluginsResponse.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify(pluginsResponse.payload),
    };
  }

  let plugins: WpPlugin[] = pluginsResponse.payload["plugins"] || [];

  try {
    await firestoreService.addBulk("wp-plugins", plugins);
    return {
      statusCode: 200,
      body: JSON.stringify(plugins),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }

  // console.log('urra', firestoreResponse);
};

// interface GetWordpressPluginsProps {
//   page?: number;
//   perPage?: number;
// }

// async function getWordpressPlugins(
//   { page, perPage }: GetWordpressPluginsProps = { page: 1, perPage: 250 }
// ) {
//   // https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[page]=2&request[per_page]=10&request[search]=brazil

//   const baseURL = "https://api.wordpress.org/plugins/info/1.2/";
//   const fullURL = `${baseURL}?action=query_plugins&request[page]=${page}&request[per_page]=${perPage}`;

//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const response = await fetch(fullURL, options);
//     const json = await response.json();
//     return {
//       ok: true,
//       payload: json,
//     };
//   } catch (e) {
//     return {
//       ok: false,
//       payload: e,
//     };
//   }
// }

export { handler };
