
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iwatdrrymrssbjubfhyl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3YXRkcnJ5bXJzc2JqdWJmaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzAwODQsImV4cCI6MjA1NjgwNjA4NH0.9-bwIUglO7fPeKRWAa-luUToHArgK6lFfet5GZPdOL8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
