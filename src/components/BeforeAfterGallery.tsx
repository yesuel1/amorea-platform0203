"use client";

import { useState } from "react";

interface BeforeAfter {
  id: number;
  title: string;
  before: string;
  after: string;
  description: string;
  duration: string;
}

const defaultGallery: BeforeAfter[] = [
  {
    id: 1,
    title: "피부 결 개선",
    before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
    after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
    description: "12주간의 맞춤 저속노화 케어로 피부 결이 개선되었습니다",
    duration: "12주",
  },
  {
    id: 2,
    title: "피부 톤 밝아짐",
    before: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&q=80",
    after: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
    description: "저속노화 스킨케어 루틴으로 피부 톤이 밝아졌습니다",
    duration: "8주",
  },
  {
    id: 3,
    title: "주름 개선",
    before: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
    after: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    description: "집중 케어로 눈가 주름이 눈에 띄게 개선되었습니다",
    duration: "16주",
  },
];

export default function BeforeAfterGallery({ gallery = defaultGallery }: { gallery?: BeforeAfter[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidePosition, setSlidePosition] = useState(50);

  if (gallery.length === 0) {
    gallery = defaultGallery;
  }

  const current = gallery[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* 헤더 */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#F4E4C1]/30 border border-[#D4AF37]/30 px-4 py-1 text-xs font-bold text-[#B8941E]">
            TRANSFORMATION
          </span>
          <h2 className="mb-4 text-4xl font-black tracking-tighter text-gray-900 sm:text-5xl">
            저속노화의 <span className="gradient-text">실제 변화</span>
          </h2>
          <p className="mx-auto max-w-lg text-base text-gray-600">
            정성스러운 케어가 만들어낸 눈에 보이는 변화
          </p>
        </div>

        {/* 비포/애프터 비교 슬라이더 */}
        <div className="mb-12">
          <div className="relative mx-auto aspect-[4/3] max-w-2xl overflow-hidden rounded-3xl shadow-2xl">
            {/* Before Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${current.before})`,
              }}
            />

            {/* After Image with clip */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${current.after})`,
                clipPath: `inset(0 ${100 - slidePosition}% 0 0)`,
              }}
            />

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-1 cursor-ew-resize bg-white shadow-lg"
              style={{
                left: `${slidePosition}%`,
              }}
              onMouseDown={(e) => {
                const container = e.currentTarget.parentElement;
                if (!container) return;

                const handleMove = (moveEvent: MouseEvent) => {
                  const rect = container.getBoundingClientRect();
                  const x = moveEvent.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  setSlidePosition(Math.max(0, Math.min(100, percentage)));
                };

                const handleUp = () => {
                  document.removeEventListener("mousemove", handleMove);
                  document.removeEventListener("mouseup", handleUp);
                };

                document.addEventListener("mousemove", handleMove);
                document.addEventListener("mouseup", handleUp);
              }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl">
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 rounded-full bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm">
              BEFORE
            </div>
            <div
              className="absolute top-4 right-4 rounded-full bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm"
              style={{
                opacity: slidePosition > 50 ? 1 : 0.3,
              }}
            >
              AFTER
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110"
              aria-label="이전"
            >
              <svg
                className="h-6 w-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110"
              aria-label="다음"
            >
              <svg
                className="h-6 w-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="mt-8 text-center">
            <h3 className="mb-2 text-2xl font-black text-gray-900">
              {current.title}
            </h3>
            <p className="mb-2 text-sm text-gray-600">{current.description}</p>
            <span className="inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1 text-xs font-bold text-[#B8941E]">
              {current.duration} 프로그램
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-4">
          {gallery.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-20 w-20 overflow-hidden rounded-xl transition-all ${
                idx === currentIndex
                  ? "ring-4 ring-[#D4AF37] scale-110"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.after})`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
