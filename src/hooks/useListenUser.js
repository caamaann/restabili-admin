import { useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

/**
 * 
 * @callback Callback
 * @param {import("@supabase/supabase-js").SupabaseRealtimePayload<any>} payload
 */

/**
 * 
 * @param {import("@supabase/supabase-js/dist/main/lib/types").SupabaseEventTypes} event 
 * @param {Callback} callback
 */
export default function useListenSupabase(table, event = "*", callback = null) {
    const subscription = useRef(null)

    useEffect(() => {        
        subscription.current = supabase
            .from(table)
            .on(event, (payload) => {
                if (callback) callback(payload)
            })
            .subscribe()

        return () => {
            if (subscription.current) {
                subscription.current.unsubscribe()
            }
        }
    }, [])
}