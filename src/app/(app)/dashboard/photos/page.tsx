"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Trash2, Star, Loader2, UploadCloud, AlertCircle } from "lucide-react";

export default function PhotosPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile/me"); // Assuming we'll fetch current profile details
      if (res.ok) {
        const data = await res.json();
        if (data.profile?.photos) {
          setPhotos(data.profile.photos);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load photos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("Image size should be less than 5MB.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("isPrimary", photos.length === 0 ? "true" : "false");

    try {
      const res = await fetch("/api/profile/photos", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setPhotos(prev => [...prev, data.photo].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1)));
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to upload photo.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const res = await fetch(`/api/profile/photos?id=${photoId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Re-fetch to get updated primary statuses if the primary was deleted
        fetchPhotos();
      } else {
        setError("Failed to delete photo.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while deleting.");
    }
  };

  const handleSetPrimary = async (photoId: string) => {
    // A quick hack for the UI: realistically, we'd need a PUT /api/profile/photos to set primary.
    // For now, let's just show an error if it fails, or implement the PUT route later.
    // Let's implement the PUT request right now!
    try {
      const res = await fetch(`/api/profile/photos/primary`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: photoId })
      });
      if (res.ok) {
        fetchPhotos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 md:px-8 pt-24 pb-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-sans text-[#2A3773]">Manage Photos</h1>
        <p className="text-gray-500 mt-1">Upload high-quality photos to get more matches and responses.</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Upload Card */}
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${uploading ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'bg-[#FFF1F5]/50 border-[#FADADF] hover:bg-[#FFF1F5] hover:border-[#DB1866]'}`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 text-[#DB1866] animate-spin mb-3" />
              <p className="text-[#2A3773] font-bold text-sm">Uploading...</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#DB1866]">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-[#2A3773] font-bold text-lg">Add New Photo</p>
              <p className="text-gray-500 text-xs mt-1 px-6 text-center">JPG or PNG up to 5MB</p>
            </>
          )}
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleUpload}
          />
        </div>

        {/* Existing Photos */}
        {loading ? (
           <div className="col-span-2 flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-[#DB1866] animate-spin" />
           </div>
        ) : (
          photos.map((photo) => (
            <div key={photo.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-[#FADADF] shadow-sm">
              <img src={photo.url} alt="Profile" className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleDelete(photo.id)}
                    className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                {!photo.isPrimary && (
                  <button 
                    onClick={() => handleSetPrimary(photo.id)}
                    className="w-full bg-white text-[#2A3773] font-bold py-2.5 rounded-xl text-sm shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    Make Primary
                  </button>
                )}
              </div>

              {photo.isPrimary && (
                <div className="absolute top-4 left-4 bg-[#DB1866] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-white" /> Primary Photo
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}
