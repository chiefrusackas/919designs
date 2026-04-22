import { useState } from 'react';

export default function Gallery() {
  const galleryData = import.meta.glob('../content/gallery/*.json', { eager: true });
  const initialPhotos = Object.keys(galleryData).map((key, index) => {
    const data = galleryData[key].default || galleryData[key];
    return {
      id: `img-${index}`,
      ...data
    };
  }).sort((a, b) => {
    if (b.pinned !== a.pinned) return b.pinned ? 1 : -1;
    return new Date(b.date) - new Date(a.date);
  });

  const [photos, setPhotos] = useState(initialPhotos.length > 0 ? initialPhotos : 
    Array.from({ length: 6 }).map((_, i) => ({
      id: `img-dummy-${i}`,
      pinned: i === 0,
      date: new Date(Date.now() - i * 100000000).toLocaleDateString(),
      image: ''
    }))
  );

  const handlePin = (id) => {
    setPhotos(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, pinned: !p.pinned } : p);
      return [...updated].sort((a, b) => (b.pinned === a.pinned) ? 0 : b.pinned ? 1 : -1);
    });
  };

  return (
    <div className="w-full flex flex-col min-h-screen p-6 md:p-12 xl:p-24 pb-32">
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs tracking-[0.3em] text-primary-container font-bold uppercase mb-4 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-primary"></span>
          Showcase
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase text-on-surface leading-none tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-surface-variant">Gallery.</span>
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant max-w-lg mt-6 font-light">
          Recent work from our manufacturing floor. Showing our latest builds.
        </p>
      </div>

      {/* Gallery Wall Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 w-full border-t border-outline/20 pt-8">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group break-inside-avoid overflow-hidden bg-surface-variant/30 border border-outline/10"
            style={{
              aspectRatio: (parseInt(photo.id.replace(/\D/g,'') || 1) % 3 === 0) ? '1/1' : '3/4'
            }}
          >
            {/* Image Layer */}
            <div className="absolute inset-0 flex items-center justify-center bg-surface-variant/10">
              {photo.image ? (
                <img
                  src={photo.image}
                  alt={photo.caption || "Gallery Work"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                />
              ) : (
                <span className="material-symbols-outlined text-[80px] text-on-surface-variant/10 group-hover:text-on-surface-variant/30 transition-colors transform group-hover:rotate-12 duration-700">
                  photo_camera
                </span>
              )}
            </div>

            {/* Hover Info Layer */}
            <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-surface/80 to-transparent flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <span className="text-[10px] tracking-widest font-bold text-on-surface uppercase">
                {photo.date}
              </span>
              <button
                onClick={() => handlePin(photo.id)}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  photo.pinned
                   ? 'bg-primary/90 text-on-primary'
                   : 'bg-surface/50 text-on-surface hover:bg-surface'
                }`}
                title={photo.pinned ? "Unpin Photo" : "Pin to Top"}
              >
                <span className="material-symbols-outlined text-sm block" style={{ fontVariationSettings: photo.pinned ? "'FILL' 1" : "'FILL' 0" }}>
                  keep
                </span>
              </button>
            </div>

            {/* Pinned Badge */}
            {photo.pinned && (
              <div className="absolute bottom-4 right-4 z-10">
                <div className="bg-primary text-on-primary px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <span className="material-symbols-outlined text-[12px] leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>keep</span>
                  Pinned
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
