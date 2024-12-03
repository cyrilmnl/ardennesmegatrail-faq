import { supabase } from "../../supabaseClient";

export const getQuestions = async () => {
  try {
    const { data, error, status } = await supabase
      .from("question")
      .select("*")
      .order("order", { ascending: true });

    if (error && status !== 406) throw error;

    if (data) return data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
