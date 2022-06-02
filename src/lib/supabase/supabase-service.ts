import { WpPlugin } from "../../types";
import supabase from "./supabase-server";

export default class SupabaseService {
  async findAll() {
    let { data: plugins_raw, error } = await supabase
      .from("plugins-raw")
      .select("*");

    if (error) {
      return {
        ok: true,
        payload: error.details,
      };
    }

    return {
      ok: true,
      payload: plugins_raw,
    };
  }

  async addBulk(plugins: WpPlugin[]) {
    const { error } = await supabase.from("plugins_raw").insert(plugins);

    console.log(error);

    if (error) {
      return {
        ok: false,
        payload: error.details,
      };
    }

    return {
      ok: true,
    };
  }
}
