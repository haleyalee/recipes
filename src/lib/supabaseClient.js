import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gbscizvadvzsztzymioj.supabase.co/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2NpenZhZHZ6c3p0enltaW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNTI1MzMsImV4cCI6MjA1MTkyODUzM30.MS0ioETAJiOgLfk111zS7zp0voYPipI8bK_0mrkPGjg";

export const supabase = createClient(supabaseUrl, supabaseKey);
