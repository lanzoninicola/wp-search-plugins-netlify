// https://api.wordpress.org/plugins/info/1.2/?action=query_plugins
// https://github.com/marketplace/actions/http-request-action
// https://jasonet.co/posts/scheduled-actions/
// https://prismatic-yeot-e7f71f.netlify.app/.netlify/functions/wp-search-plugins-api

import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { WpPlugin, WpPluginAPIResponse } from "../../interfaces";
import firestoreService from "../../lib/firebase/firestore.service";

const handler: Handler = async (event, context) => {
  const pluginsResponse: WpPluginAPIResponse | {} = await getWordpressPlugins();

  let plugins: WpPlugin[] = pluginsResponse["plugins"] || [];

  const firstPlugin = plugins[0];

  const firestoreResponse = await firestoreService.add(
    "wp-plugins",
    firstPlugin
  );

  // console.log('urra', firestoreResponse);

  return {
    statusCode: 200,
    body: JSON.stringify(firestoreResponse),
  };
};

async function getWordpressPlugins() {
  const url =
    "https://api.wordpress.org/plugins/info/1.2/?action=query_plugins";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
}

export { handler };
