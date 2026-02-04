import { notFound } from "next/navigation";
import Link from "next/link";
import { counselors } from "@/data/counselors";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return counselors.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const counselor = counselors.find((c) => c.id === id);
    if (!counselor) return { title: "카운셀러를 찾을 수 없습니다" };
    return {
      title: `${counselor.name} | ${counselor.role} - AMOREA 분당점`,
      description: counselor.shortDesc,
    };
  });
}

export default async function CounselorDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const counselor = counselors.find((c) => c.id === id);

  if (!counselor) notFound();

  const c = counselor;

  return (
    <div className="min-h-screen font-sans">
      <Navbar backLink={{ href: "/#counselors", label: "← 목록으로" }} />

      {/* 히어로 */}
      <section
        className="relative flex items-end overflow-hidden px-4 pb-16 pt-32 sm:pb-20 sm:pt-40"
        style={{
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)",
        }}
      >
        <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-[#7B1FA2]/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#E91E63]/10 blur-[80px]" />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end">
            {/* 프로필 이미지 */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-6xl backdrop-blur-sm sm:h-40 sm:w-40">
              {c.emoji}
            </div>
            <div className="text-center sm:text-left">
              <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#F06292]">
                {c.role}
              </span>
              <h1 className="mb-2 text-3xl font-extrabold text-white sm:text-4xl">
                {c.name} <span className="text-lg font-normal text-white/50">카운셀러</span>
              </h1>
              <p className="max-w-lg text-sm leading-relaxed text-white/70">{c.shortDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 소개 */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 sm:grid-cols-5">
            {/* 왼쪽: 상세 소개 */}
            <div className="sm:col-span-3">
              <h2 className="mb-4 text-xl font-extrabold text-gray-900">소개</h2>
              <p className="mb-8 text-sm leading-relaxed text-gray-600">{c.fullDesc}</p>

              <h3 className="mb-3 text-sm font-bold text-[#7B1FA2] uppercase tracking-widest">Philosophy</h3>
              <blockquote className="mb-8 border-l-4 border-[#E91E63]/30 pl-4 text-sm italic leading-relaxed text-gray-500">
                &ldquo;{c.philosophy}&rdquo;
              </blockquote>
            </div>

            {/* 오른쪽: 전문 분야 & 자격 */}
            <div className="sm:col-span-2">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="mb-4 text-sm font-bold text-gray-900">전문 분야</h3>
                <div className="mb-6 flex flex-wrap gap-2">
                  {c.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-gradient-to-r from-[#7B1FA2]/10 to-[#E91E63]/10 px-3 py-1.5 text-xs font-semibold text-[#7B1FA2]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <h3 className="mb-4 text-sm font-bold text-gray-900">자격 & 인증</h3>
                <ul className="space-y-2">
                  {c.certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-0.5 text-[#E91E63]">✓</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 */}
      <section className="bg-[#FAFAFA] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#F3E5F5] px-4 py-1 text-xs font-bold text-[#7B1FA2]">
              PROGRAMS
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {c.name} 카운셀러의 프로그램
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {c.programs.map((p, idx) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${
                      idx === 0 ? "#7B1FA2" : idx === 1 ? "#E91E63" : "#9C27B0"
                    }, ${idx === 0 ? "#E91E63" : idx === 1 ? "#FF5722" : "#E91E63"})`,
                  }}
                />
                <span className="mb-3 inline-block text-2xl">
                  {idx === 0 ? "🔬" : idx === 1 ? "🏠" : "🔄"}
                </span>
                <h3 className="mb-2 text-sm font-bold text-gray-900">{p.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#FCE4EC] px-4 py-1 text-xs font-bold text-[#E91E63]">
              REVIEWS
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">고객 후기</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {c.reviews.map((r) => (
              <div
                key={r.name}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-6"
              >
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-[#7B1FA2]/5 to-[#E91E63]/5" />
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < r.rating ? "text-amber-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm font-bold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-4 py-16 sm:px-6"
        style={{
          background: "linear-gradient(135deg, #7B1FA2 0%, #E91E63 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
            {c.name} 카운셀러와 상담하기
          </h2>
          <p className="mb-8 text-sm text-white/80">
            저속노화 뷰티의 첫 걸음을 함께 시작해보세요.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="w-full rounded-full bg-white px-10 py-3.5 text-sm font-bold text-[#7B1FA2] shadow-lg transition-transform hover:scale-105 sm:w-auto"
            >
              상담 예약하기
            </a>
            <Link
              href="/#counselors"
              className="w-full rounded-full border-2 border-white px-10 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-white/10 sm:w-auto"
            >
              다른 카운셀러 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#0f0517] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl text-center text-xs text-gray-600">
          &copy; 2025 AMOREA 분당점. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
