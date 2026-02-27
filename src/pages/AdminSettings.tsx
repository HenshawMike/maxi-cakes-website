import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, MessageCircle, Phone, Save } from "lucide-react";
import { Label } from "@/components/ui/label";

const AdminSettings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [whatsapp, setWhatsapp] = useState("");

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("settings")
                .select("value")
                .eq("key", "whatsapp_number")
                .single();

            if (error && error.code !== "PGRST116") throw error;

            if (data) {
                setWhatsapp(data.value || "");
            }
        } catch (error: any) {
            toast.error("Failed to fetch settings: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase
                .from("settings")
                .upsert({
                    key: "whatsapp_number",
                    value: whatsapp,
                    updated_at: new Date().toISOString(),
                }, { onConflict: "key" });

            if (error) throw error;
            toast.success("Settings updated successfully!");
        } catch (error: any) {
            toast.error("Error updating settings: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground mt-4">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground mt-1">Configure global application variables and contact information.</p>
            </div>

            <div className="max-w-2xl">
                <Card className="border-primary/20 shadow-sm overflow-hidden">
                    <div className="bg-primary/5 p-4 border-b border-primary/10 flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold">Contact & Communication</h2>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg">WhatsApp Configuration</CardTitle>
                        <CardDescription>
                            This number is used for the "Order Now" and contact buttons across the site.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSave}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp Phone Number</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="whatsapp"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        placeholder="e.g. +2348073535850"
                                        className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 px-1">
                                    Include country code for international support (e.g. +234 for Nigeria).
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t bg-muted/5 flex justify-end">
                            <Button type="submit" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save Settings
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AdminSettings;
