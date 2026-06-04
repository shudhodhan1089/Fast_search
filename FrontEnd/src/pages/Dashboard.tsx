import { SupabaseClient, type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

const supabase = createClient();
export default function Dashboard(){
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    useEffect(()=>{
        async function getInfo() {
            const {data, error} = await supabase.auth.getUser()
            if (data.user){
                setUser(data.user)
            }            
        }
        getInfo();
    })
    useEffect(()=>{
            async function getExistingConversations() {
                if(user) {
                const {data:{session}} = await supabase.auth.getSession()
                const jwt = session?.access_token;
                const response = await axios.get(`${BACKEND_URL}/conversations`,{
                    headers:{
                        Authorization : jwt
                    }
                })
                // console.log(response.data);
            }   
        }
        getExistingConversations();
    },[user])
    return <div>
        {!user && <button onClick={()=>{
            navigate("/Auth");
        }}>sign in</button>}
        {user?.email}
        <button onClick={()=>{
            supabase.auth.signOut();
        }}>Logout
        </button>

    </div>
}