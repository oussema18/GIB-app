import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://dacvvspdtayiatuxpsci.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhY3Z2c3BkdGF5aWF0dXhwc2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMDk3NzcsImV4cCI6MjAzNjg4NTc3N30.-QuLH6zBMtEnMLIocPHAj8QketLS5dqUT0UpoPxShJc";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Define and export the function
export function getProductDetailsById(productId) {
  return supabase
    .from("Produits")
    .select("*")
    .eq("identifiant", productId)
    .single()
    .then((response) => {
      const { data, error } = response;
      if (error) {
        console.error("Error fetching product details:", error);
        return null;
      }
      return data;
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      return null;
    });
}
