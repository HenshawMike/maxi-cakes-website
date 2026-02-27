import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Plus,
    Trash2,
    Edit,
    Upload,
    Loader2,
    Image as ImageIcon,
    X
} from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Cake {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
}

const BUCKET_NAME = "maxi-cakes";

const AdminContent = () => {
    const [cakes, setCakes] = useState<Cake[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCake, setCurrentCake] = useState<Partial<Cake> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        fetchCakes();
    }, []);

    const fetchCakes = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("cakes")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setCakes(data || []);
        } catch (error: any) {
            toast.error("Failed to fetch cakes: " + error.message);
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

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `cakes/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let imageUrl = currentCake?.image_url || "";

            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile);
            }

            const cakeData = {
                title: currentCake?.title,
                description: currentCake?.description,
                image_url: imageUrl,
            };

            if (currentCake?.id) {
                // Update
                const { error } = await supabase
                    .from("cakes")
                    .update(cakeData)
                    .eq("id", currentCake.id);
                if (error) throw error;
                toast.success("Cake updated successfully!");
            } else {
                // Create
                const { error } = await supabase
                    .from("cakes")
                    .insert([cakeData]);
                if (error) throw error;
                toast.success("New cake added successfully!");
            }

            setIsDialogOpen(false);
            resetForm();
            fetchCakes();
        } catch (error: any) {
            toast.error("Error saving cake: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const { error } = await supabase
                .from("cakes")
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("Cake deleted successfully!");
            fetchCakes();
        } catch (error: any) {
            toast.error("Error deleting cake: " + error.message);
        }
    };

    const resetForm = () => {
        setCurrentCake(null);
        setSelectedFile(null);
        setPreviewUrl("");
    };

    const openAddDialog = () => {
        resetForm();
        setCurrentCake({ title: "", description: "", image_url: "" });
        setIsDialogOpen(true);
    };

    const openEditDialog = (cake: Cake) => {
        resetForm();
        setCurrentCake(cake);
        setPreviewUrl(cake.image_url);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cake Showcase</h1>
                    <p className="text-muted-foreground mt-1">Manage the cakes displayed on your website.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openAddDialog} className="shadow-lg">
                            <Plus className="mr-2 h-4 w-4" /> Add New Cake
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>{currentCake?.id ? "Edit Cake" : "Add New Cake"}</DialogTitle>
                            <DialogDescription>
                                Fill in the details below. Images are stored securely in Supabase.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 py-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={currentCake?.title || ""}
                                        onChange={(e) => setCurrentCake({ ...currentCake, title: e.target.value })}
                                        placeholder="e.g. Chocolate Velvet Cake"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={currentCake?.description || ""}
                                        onChange={(e) => setCurrentCake({ ...currentCake, description: e.target.value })}
                                        placeholder="Describe this delicious creation..."
                                        className="min-h-[100px]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Cake Image</Label>
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-lg p-6 bg-muted/20 hover:bg-muted/30 transition-colors relative">
                                        {previewUrl ? (
                                            <div className="relative w-full aspect-video rounded-md overflow-hidden border shadow-sm">
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => { setSelectedFile(null); setPreviewUrl(""); }}
                                                    className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-full text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
                                                    <ImageIcon className="h-6 w-6 text-primary" />
                                                </div>
                                                <p className="text-sm font-medium">Click to upload image</p>
                                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP (Max 5MB)</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required={!currentCake?.id && !selectedFile}
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Cake"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground mt-4">Loading your delicacies...</p>
                </div>
            ) : cakes.length === 0 ? (
                <Card className="bg-muted/10 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="p-4 bg-muted rounded-full mb-4">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold">No cakes found</h3>
                        <p className="text-muted-foreground text-center mt-1">
                            Start by adding your first cake creation to the showcase.
                        </p>
                        <Button onClick={openAddDialog} variant="outline" className="mt-6">
                            <Plus className="mr-2 h-4 w-4" /> Add First Cake
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cakes.map((cake) => (
                        <Card key={cake.id} className="overflow-hidden group border-primary/10 hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
                            <div className="relative aspect-video overflow-hidden bg-muted">
                                <img
                                    src={cake.image_url}
                                    alt={cake.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <Button variant="secondary" size="sm" onClick={() => openEditDialog(cake)}>
                                        <Edit className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(cake.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </Button>
                                </div>
                            </div>
                            <CardHeader className="p-5">
                                <CardTitle className="text-xl line-clamp-1">{cake.title}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-2 h-10">
                                    {cake.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminContent;
