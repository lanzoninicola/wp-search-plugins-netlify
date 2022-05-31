import WordpressPluginsAPIService from "../services/wp-plugins-api-service";

export default function getWordpressPluginsAPI() {
  return new WordpressPluginsAPIService();
}
