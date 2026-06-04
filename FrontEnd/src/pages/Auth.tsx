import { createClient } from "@/lib/supabase/client";

 const supabase = createClient();
export default function Auth(){
        async function login(provider: "google"|"github") {
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: provider,
            })
            if (error){
                alert("Error while signing in");
            }
            else{
                alert("Signed in Successfully!");
            }
        }
    return <div>
        <button onClick={()=>login("google")}>Login with google</button>
        <button onClick={()=>login("github")}>Login with Github</button>
    </div>
}