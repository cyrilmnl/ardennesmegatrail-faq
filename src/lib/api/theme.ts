import { supabase } from "../../supabaseClient";

export const getThemes = async () => {
  try {
    const { data, error, status } = await supabase.from("theme").select("*");

    if (error && status !== 406) throw error;

    if (data) return data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
