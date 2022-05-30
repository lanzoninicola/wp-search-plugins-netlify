// https://github.com/marketplace/actions/http-request-action
// https://jasonet.co/posts/scheduled-actions/
// https://prismatic-yeot-e7f71f.netlify.app/.netlify/functions/wp-search-plugins-api

exports.handler = async function (event, context) {
  const plugins = await getWordpressPlugins();

  return {
    statusCode: 200,
    body: JSON.stringify(plugins),
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
    .then((json) => json.plugins)
    .catch((error) => console.log(error));
}
