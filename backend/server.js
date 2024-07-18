import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  "https://dacvvspdtayiatuxpsci.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhY3Z2c3BkdGF5aWF0dXhwc2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMDk3NzcsImV4cCI6MjAzNjg4NTc3N30.-QuLH6zBMtEnMLIocPHAj8QketLS5dqUT0UpoPxShJc"
);

const { data, error } = await supabase.from("Produits").select();
console.log(data);
