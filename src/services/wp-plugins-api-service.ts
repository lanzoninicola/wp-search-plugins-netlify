import { WpPluginAPIPageResponse } from "../types";
import fetch from "node-fetch";

interface WordpressPluginsAPIFindPaginatedProps {
  page: number;
  perPage?: number;
}

interface WordpressPluginsAPIPageResponse {
  ok: boolean;
  payload: WpPluginAPIPageResponse | {};
}

// https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[page]=2&request[per_page]=10&request[search]=brazil
export default class WordpressPluginsAPIService {
  private baseURL = "https://api.wordpress.org/plugins/info/1.2/";
  private wpAction = "query_plugins";

  async findPaginated({
    page = 1,
    perPage = 250,
  }: WordpressPluginsAPIFindPaginatedProps): Promise<WordpressPluginsAPIPageResponse> {
    const { baseURL, wpAction } = this;
    const fullURL = `${baseURL}?action=${wpAction}&request[page]=${page}&request[per_page]=${perPage}`;

    console.log(fullURL);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(fullURL, options);

      const json: WpPluginAPIPageResponse | {} = await response.json();
      return {
        ok: true,
        payload: json,
      };
    } catch (e) {
      return {
        ok: false,
        payload: e,
      };
    }
  }
}
