import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
    Cake,
    UserCircle,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Logout failed");
        } else {
            toast.success("Logged out successfully");
            navigate("/admin/login");
        }
    };

    const navItems = [
        { name: "Content Management", path: "/admin/content", icon: Cake },
        { name: "Baker Profile", path: "/admin/profile", icon: UserCircle },
        { name: "Settings", path: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-background border-r border-primary/10 transition-all duration-300 ease-in-out flex flex-col z-20",
                    sidebarOpen ? "w-64" : "w-20"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-primary/10">
                    <LayoutDashboard className="h-6 w-6 text-primary mr-3 shrink-0" />
                    {sidebarOpen && <span className="font-bold text-lg tracking-tight">Admin CMS</span>}
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center px-3 py-2.5 rounded-lg transition-colors group",
                                location.pathname === item.path
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0", sidebarOpen ? "mr-3" : "mx-auto")} />
                            {sidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                            {!sidebarOpen && (
                                <div className="absolute left-14 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border shadow-md">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-primary/10">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive", !sidebarOpen && "px-0 justify-center")}
                        onClick={handleLogout}
                    >
                        <LogOut className={cn("h-5 w-5 shrink-0", sidebarOpen ? "mr-3" : "")} />
                        {sidebarOpen && <span>Sign Out</span>}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-background border-b border-primary/10 flex items-center justify-between px-8 sticky top-0 z-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-muted-foreground"
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>

                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-sm text-primary hover:underline flex items-center">
                            View Site <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
