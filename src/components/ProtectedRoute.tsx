import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    navigate("/admin/login");
                    return;
                }

                // Check for admin role in profiles table
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();

                if (error || profile?.role !== "admin") {
                    console.error("Access denied: Not an admin", error);
                    navigate("/");
                    return;
                }

                setIsAdmin(true);
            } catch (error) {
                console.error("Auth check error:", error);
                navigate("/admin/login");
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return isAdmin ? <>{children}</> : null;
};

export default ProtectedRoute;
