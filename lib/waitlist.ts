import { supabase } from "./supabase";
import type { WaitlistEntry } from "@/types/waitlist";

export async function addWaitlist (data: WaitlistEntry){
    const { error } = await supabase.from("waitlist").insert([data])

    if (error) throw error
}