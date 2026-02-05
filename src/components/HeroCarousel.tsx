"use client";

import { useState, useEffect } from "react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "나이는 숫자일 뿐,",
    subtitle: "되돌리는 아름다움",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80",
    gradient: "from-purple-900/80 via-pink-900/70 to-purple-900/80",
  },
  {
    id: 2,
    title: "세포부터 시작하는",
    subtitle: "저속노화 케어",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80",
    gradient: "from-pink-900/80 via-purple-900/70 to-pink-900/80",
  },
  {
    id: 3,
    title: "건강하게 아름다워지는",
    subtitle: "나만의 여정",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1920&q=80",
    gradient: "from-purple-900/80 via-indigo-900/70 to-purple-900/80",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* 배경 이미지들 */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* 배경 이미지 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          {/* 그라데이션 오버레이 */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
          />
          {/* 추가 다크 오버레이 */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* 글로우 장식 (기존 유지) */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-[#7B1FA2]/20 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#E91E63]/15 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9C27B0]/10 blur-[80px]" />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* 배지 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E91E63] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E91E63]" />
            </span>
            <span className="text-xs font-medium text-white/80">
              저속노화 뷰티 플랫폼
            </span>
          </div>

          {/* 타이틀 (애니메이션) */}
          <div
            className={`transition-all duration-500 ${
              isAnimating
                ? "translate-y-4 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tighter text-white sm:text-7xl lg:text-8xl sm:leading-[1.1]">
              {slides[currentSlide].title}
              <br />
              <span className="gradient-text-gold">
                {slides[currentSlide].subtitle}
              </span>
            </h1>
          </div>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            아모레 분당점에서 시작하는{" "}
            <span className="font-semibold text-[#F06292]">저속노화</span>{" "}
            라이프.
            <br className="hidden sm:block" />
            건강하게 아름다워지면서, 나만의 브랜드와 수익까지 만들어보세요.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#about"
              className="btn-shimmer animate-glow-gold w-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4E4C1] to-[#B8941E] px-12 py-5 text-base font-black text-[#0a0a0a] shadow-2xl transition-transform hover:scale-105 sm:w-auto"
            >
              저속노화의 비밀 알아보기
            </a>
            <a
              href="/apply"
              className="glass-card-premium w-full rounded-full px-12 py-5 text-base font-bold text-white transition-all hover:scale-105 hover:border-[#D4AF37]/50 sm:w-auto"
            >
              카운셀러로 함께하기
            </a>
          </div>

          {/* 키워드 태그 */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["#저속노화", "#안티에이징", "#셀프뷰티", "#퍼스널브랜딩"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/50"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 transition-all ${
              index === currentSlide
                ? "w-8 bg-[#D4AF37]"
                : "w-2 bg-white/30 hover:bg-white/50"
            } rounded-full`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <svg
          className="h-5 w-5 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
