import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import BaseConfig from "app/config/config.base";

export const supabase = createClient(BaseConfig.supabaseUrl, BaseConfig.supabaseAnonKey, {
    auth: {
        persistSession: true,
        storage: AsyncStorage
    }
}) 