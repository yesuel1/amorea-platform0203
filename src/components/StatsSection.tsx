"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  value: number;
  label: string;
  suffix: string;
  icon: string;
  decimals?: number;
}

const stats: Stat[] = [
  {
    value: 3000,
    label: "만족한 고객",
    suffix: "+",
    icon: "👥",
  },
  {
    value: 97,
    label: "재구매율",
    suffix: "%",
    icon: "💯",
  },
  {
    value: 15,
    label: "평균 경력",
    suffix: "년",
    icon: "⭐",
  },
  {
    value: 4.9,
    label: "고객 평점",
    suffix: "/5",
    icon: "🌟",
    decimals: 1,
  },
];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, count } = useCountUp(stat.value, 2000);

  const formatNumber = (num: number) => {
    if (stat.decimals) {
      return num.toFixed(stat.decimals);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="glass-card-premium relative overflow-hidden rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:scale-105">
        <div className="mb-4 text-5xl">{stat.icon}</div>
        <div className="mb-2 flex items-baseline justify-center gap-1">
          <span className="text-5xl font-black text-white">
            {formatNumber(count)}
          </span>
          <span className="text-2xl font-bold text-[#D4AF37]">
            {stat.suffix}
          </span>
        </div>
        <p className="text-sm font-medium text-white/70">{stat.label}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#4a1942] px-4 py-20 sm:px-6">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#7B1FA2]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#E91E63]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* 헤더 */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-bold text-[#F4E4C1]">
            TRUST & EXCELLENCE
          </span>
          <h2 className="text-3xl font-black tracking-tighter text-white sm:text-4xl">
            숫자로 증명하는 <span className="gradient-text-gold">신뢰</span>
          </h2>
        </div>

        {/* 통계 그리드 */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} index={idx} />
          ))}
        </div>

        {/* 하단 텍스트 */}
        <div className="mt-16 text-center">
          <p className="text-base text-white/60 sm:text-lg">
            <span className="font-bold text-[#D4AF37]">10년 이상</span>의
            노하우와{" "}
            <span className="font-bold text-[#D4AF37]">검증된 전문성</span>으로
            <br className="hidden sm:block" />
            고객님의 저속노화 여정을 함께합니다
          </p>
        </div>
      </div>
    </section>
  );
}
