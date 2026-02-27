import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, UserCircle, Upload, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

const BUCKET_NAME = "maxi-cakes";

const AdminBakerProfile = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUserId(user.id);

            const { data, error } = await supabase
                .from("baker_profile")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error && error.code !== "PGRST116") throw error;

            if (data) {
                setBio(data.bio || "");
                setProfileImage(data.profile_image_url || "");
                setPreviewUrl(data.profile_image_url || "");
            }
        } catch (error: any) {
            toast.error("Failed to fetch profile: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;
        setSaving(true);

        try {
            let imageUrl = profileImage;

            if (selectedFile) {
                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `profile-${userId}.${fileExt}`;
                const filePath = `profile/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from(BUCKET_NAME)
                    .upload(filePath, selectedFile, { upsert: true });

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const { error } = await supabase
                .from("baker_profile")
                .upsert({
                    id: userId,
                    bio: bio,
                    profile_image_url: imageUrl,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;
            setProfileImage(imageUrl);
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            toast.error("Error updating profile: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground mt-4">Loading profile data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Baker Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your professional bio and profile picture.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="md:col-span-1 border-primary/20 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Profile Picture</CardTitle>
                        <CardDescription>This image will be shown in the 'About' section.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6">
                        <div className="relative group cursor-pointer w-48 h-48 rounded-full overflow-hidden border-4 border-muted shadow-lg">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Baker" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <UserCircle className="h-24 w-24 text-muted-foreground" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                                <Upload className="h-8 w-8 mb-2" />
                                <span className="text-xs font-medium">Update Photo</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            Recommended: Square image, at least 400x400px.
                        </p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-primary/20 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Bio & Information</CardTitle>
                        <CardDescription>Tell your customers about your baking journey and passion.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="bio">Professional Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Share your story..."
                                    className="min-h-[250px] leading-relaxed transition-all focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t mt-4 flex justify-end">
                            <Button type="submit" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    "Save Profile"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AdminBakerProfile;
