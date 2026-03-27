import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yjodtjrbevkrhntksvyx.supabase.co";
const supabaseAnonKey = "sb_publishable_8eCn_BbvbOnPfNDIZVg9qw_6DNpfHNm";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
