"use client";

import { useState } from "react";
import Image from "next/image";
import { FaImages, FaTimes, FaExpand } from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";

const galleryImages = [
  {
    id: 1,
    title: "MPTC Scholarship & KSHRD Award Ceremony",
    category: "Award & Achievement",
    image: "/blog/photo_2026-08-13_23-47-12.jpg",
    alt: "MPTC Scholarship Award Ceremony",
  },
  {
    id: 2,
    title: "My Personal Style",
    category: "My Personal Style",
    image: "/blog/photo_2026-08-13_23-47-10.jpg",
    alt: "My Personal Style",
  },
  {
    id: 3,
    title: "Coding Challenge Prize Giving Ceremony",
    category: "Competition",
    image: "/blog/photo_2026-08-13_23-47-13.jpg",
    alt: "Coding Challenge Prize Ceremony",
  },
  {
    id: 4,
    title: "My Personal Style",
    category: "My Personal Style",
    image: "/blog/photo_2026-08-13_23-47-14.jpg",
    alt: "My Personal Style",
  },
  {
    id: 5,
    title: "My Personal Style",
    category: "My Personal Style",
    image: "/blog/photo_2026-08-13_23-47-15.jpg",
    alt: "My Personal Style",
  },
  {
    id: 6,
    title: "My Personal Style",
    category: "My Personal Style",
    image: "/blog/photo_2026-08-13_23-47-10 (2).jpg",
    alt: "My Personal Style",
  },
  {
    id: 7,
    title: "KSHRD 14th Generation Graduation",
    category: "Graduation",
    image: "/blog/photo_2026-08-13_23-47-13 (2).jpg",
    alt: "KSHRD Graduation Ceremony",
  },
  {
    id: 8,
    title: "My Personal Style",
    category: "My Personal Style",
    image: "/blog/photo_2026-08-14_00-16-11.jpg",
    alt: "My Personal Style",
  },
  {
    id: 9,
    title: "My Personal Style",
    category: "My Personal Style",
    image: "/blog/photo_2026-08-14_00-16-12.jpg",
    alt: "My Personal Style",
  },
  {
    id: 10,
    title: "IT Workshop & Networking Collaboration",
    category: "Networking",
    image: "/blog/photo_2026-08-14_00-16-12 (2).jpg",
    alt: "IT Workshop Session",
  },
  {
    id: 11,
    title: "My Personal Style",
    category: "My Personal Style",
    image: "/blog/photo_2026-08-14_00-16-36.jpg",
    alt: "My Personal Style",
  },
];

export default function Blog() {
  const [revealRef, revealClass] = useScrollReveal();
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="blog" ref={revealRef} className={`blog-page anim-fade ${revealClass}`}>
      <div className="blog-header anim-slide">
        <span className="blog-kicker">
          <FaImages aria-hidden="true" />
          Photo Gallery
        </span>
        <h1 className="blog-title">Blog Gallery</h1>
        <p className="blog-intro">
          Visual highlights from coding competitions, cybersecurity training, KSHRD graduation, and tech achievements.
        </p>
      </div>

      {/* Masonry Waterfall Grid */}
      <div className="blog-masonry-grid anim-slide" style={{ animationDelay: "0.15s" }}>
        {galleryImages.map((item) => (
          <div
            key={item.id}
            className="masonry-item-card"
            onClick={() => setSelectedImage(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedImage(item);
            }}
          >
            <div className="masonry-img-container">
              <Image
                src={item.image}
                alt={item.alt}
                width={800}
                height={1000}
                className="masonry-img"
              />
              <div className="masonry-overlay">
                <span className="blog-image-tag">{item.category}</span>
                <h3 className="blog-image-title">{item.title}</h3>
                <span className="blog-expand-hint">
                  <FaExpand aria-hidden="true" /> View Full Photo
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Image Preview Modal */}
      {selectedImage && (
        <div className="image-lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="image-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="image-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close photo preview"
            >
              <FaTimes />
            </button>
            <div className="image-lightbox-img-wrap">
              <Image
                src={selectedImage.image}
                alt={selectedImage.alt}
                width={1200}
                height={900}
                className="image-lightbox-img"
              />
            </div>
            <div className="image-lightbox-info">
              <span className="blog-image-tag">{selectedImage.category}</span>
              <h2>{selectedImage.title}</h2>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
