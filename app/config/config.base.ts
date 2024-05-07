export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[],
  supabaseUrl:string,
  supabaseAnonKey:string
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],
  supabaseUrl:"https://fawljrfbevnvxjlnedrj.supabase.co",
  supabaseAnonKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhd2xqcmZiZXZudnhqbG5lZHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwODEyNzUsImV4cCI6MjAzMDY1NzI3NX0.ffyv6uJc0qEnWBWxf9Tlc9PVgZhnwCAxGXREFQQxcHA"
}

export default BaseConfig
