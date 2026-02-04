"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

type FormData = {
  name: string;
  phone: string;
  email: string;
  age: string;
  occupation: string;
  occupationDetail: string;
  interest: string[];
  experience: string;
  motivation: string;
  schedule: string;
  sns: string;
  agreement: boolean;
};

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  age: "",
  occupation: "",
  occupationDetail: "",
  interest: [],
  experience: "",
  motivation: "",
  schedule: "",
  sns: "",
  agreement: false,
};

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;

  function update(field: keyof FormData, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleInterest(item: string) {
    setForm((prev) => ({
      ...prev,
      interest: prev.interest.includes(item)
        ? prev.interest.filter((i) => i !== item)
        : [...prev.interest, item],
    }));
  }

  function canNext() {
    if (step === 1) {
      return form.name && form.phone && form.age && form.occupation;
    }
    if (step === 2) {
      return form.interest.length > 0 && form.motivation;
    }
    return form.agreement;
  }

  function handleSubmit() {
    if (!canNext()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 font-sans">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 text-6xl">🎉</div>
          <h1 className="mb-3 text-2xl font-extrabold text-gray-900">
            지원이 완료되었습니다!
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-gray-500">
            <span className="font-semibold text-[#7B1FA2]">{form.name}</span>님,
            아모레 분당점 카운셀러 지원에 감사드립니다.
            <br />
            담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-gradient-to-r from-[#7B1FA2] to-[#E91E63] px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar backLink={{ href: "/", label: "← 메인으로" }} />

      {/* 헤더 */}
      <section
        className="relative overflow-hidden px-4 pb-12 pt-28 sm:pb-16 sm:pt-32"
        style={{
          background: "linear-gradient(135deg, #7B1FA2 0%, #E91E63 100%)",
        }}
      >
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-semibold text-white">2025 카운셀러 모집</span>
          </div>
          <h1 className="mb-3 text-2xl font-extrabold text-white sm:text-4xl">
            아모레 카운셀러 지원하기
          </h1>
          <p className="text-sm text-white/80">
            건강하게 아름다워지면서 퍼스널 브랜딩과 추가 수익까지 만들어보세요.
          </p>
        </div>
      </section>

      {/* 프로그레스 바 */}
      <div className="bg-white px-4 py-6 shadow-sm sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex justify-between text-xs font-semibold text-gray-400">
            <span className={step >= 1 ? "text-[#7B1FA2]" : ""}>1. 기본 정보</span>
            <span className={step >= 2 ? "text-[#7B1FA2]" : ""}>2. 관심 & 동기</span>
            <span className={step >= 3 ? "text-[#7B1FA2]" : ""}>3. 추가 정보</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(step / totalSteps) * 100}%`,
                background: "linear-gradient(90deg, #7B1FA2, #E91E63)",
              }}
            />
          </div>
        </div>
      </div>

      {/* 폼 */}
      <section className="bg-[#FAFAFA] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {/* Step 1: 기본 정보 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 text-lg font-extrabold text-gray-900">기본 정보</h2>

                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      이름 <span className="text-[#E91E63]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="홍길동"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#7B1FA2] focus:ring-2 focus:ring-[#7B1FA2]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      연락처 <span className="text-[#E91E63]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#7B1FA2] focus:ring-2 focus:ring-[#7B1FA2]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="email@example.com"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#7B1FA2] focus:ring-2 focus:ring-[#7B1FA2]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      연령대 <span className="text-[#E91E63]">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["20대", "30대", "40대", "50대+"].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => update("age", a)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                            form.age === a
                              ? "border-[#7B1FA2] bg-[#7B1FA2]/5 text-[#7B1FA2]"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      현재 직업 <span className="text-[#E91E63]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {["육아맘", "자영업자", "N잡러", "직장인", "프리랜서", "학생", "뷰티업종", "기타"].map((o) => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => update("occupation", o)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                            form.occupation === o
                              ? "border-[#E91E63] bg-[#E91E63]/5 text-[#E91E63]"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(form.occupation === "자영업자" || form.occupation === "기타") && (
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        구체적인 직업/업종
                      </label>
                      <input
                        type="text"
                        value={form.occupationDetail}
                        onChange={(e) => update("occupationDetail", e.target.value)}
                        placeholder="예: 카페 운영, 네일샵 등"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#7B1FA2] focus:ring-2 focus:ring-[#7B1FA2]/10"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 관심 & 동기 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 text-lg font-extrabold text-gray-900">관심 분야 & 지원 동기</h2>

                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      관심 분야 <span className="text-[#E91E63]">*</span>
                      <span className="ml-1 text-xs font-normal text-gray-400">(복수 선택 가능)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "저속노화 스킨케어",
                        "역노화 메이크업",
                        "이너뷰티",
                        "바디&웰니스",
                        "퍼스널 브랜딩",
                        "뷰티 콘텐츠 제작",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                            form.interest.includes(item)
                              ? "border-[#7B1FA2] bg-[#7B1FA2]/5 text-[#7B1FA2]"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {form.interest.includes(item) ? "✓ " : ""}
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      뷰티 관련 경험
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {["경험 없음", "취미 수준", "전문 경력 있음"].map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => update("experience", e)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                            form.experience === e
                              ? "border-[#E91E63] bg-[#E91E63]/5 text-[#E91E63]"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      지원 동기 <span className="text-[#E91E63]">*</span>
                    </label>
                    <textarea
                      value={form.motivation}
                      onChange={(e) => update("motivation", e.target.value)}
                      placeholder="아모레 카운셀러에 지원하게 된 계기와 기대하는 점을 자유롭게 적어주세요."
                      rows={4}
                      className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#7B1FA2] focus:ring-2 focus:ring-[#7B1FA2]/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 추가 정보 */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 text-lg font-extrabold text-gray-900">추가 정보</h2>

                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      선호 활동 시간대
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {["오전", "오후", "저녁", "주말"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update("schedule", s)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                            form.schedule === s
                              ? "border-[#7B1FA2] bg-[#7B1FA2]/5 text-[#7B1FA2]"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      SNS 계정 (선택)
                    </label>
                    <input
                      type="text"
                      value={form.sns}
                      onChange={(e) => update("sns", e.target.value)}
                      placeholder="인스타그램, 블로그 등 URL"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#7B1FA2] focus:ring-2 focus:ring-[#7B1FA2]/10"
                    />
                  </div>

                  {/* 지원 요약 */}
                  <div className="rounded-xl bg-gray-50 p-5">
                    <h3 className="mb-3 text-sm font-bold text-gray-900">지원 요약</h3>
                    <div className="space-y-1.5 text-xs text-gray-500">
                      <p><span className="font-semibold text-gray-700">이름:</span> {form.name}</p>
                      <p><span className="font-semibold text-gray-700">연락처:</span> {form.phone}</p>
                      <p><span className="font-semibold text-gray-700">연령대:</span> {form.age}</p>
                      <p><span className="font-semibold text-gray-700">직업:</span> {form.occupation} {form.occupationDetail && `(${form.occupationDetail})`}</p>
                      <p><span className="font-semibold text-gray-700">관심 분야:</span> {form.interest.join(", ")}</p>
                      <p><span className="font-semibold text-gray-700">경험:</span> {form.experience || "미선택"}</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreement}
                      onChange={(e) => update("agreement", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded accent-[#7B1FA2]"
                    />
                    <span className="text-xs leading-relaxed text-gray-500">
                      개인정보 수집 및 이용에 동의합니다. 수집된 정보는 카운셀러 지원 심사
                      목적으로만 사용되며, 심사 완료 후 파기됩니다.
                      <span className="text-[#E91E63]"> *</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50"
              >
                이전
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => canNext() && setStep(step + 1)}
                disabled={!canNext()}
                className={`flex-1 rounded-full py-3 text-sm font-bold text-white transition-all ${
                  canNext()
                    ? "bg-gradient-to-r from-[#7B1FA2] to-[#E91E63] hover:scale-[1.02] shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                다음
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canNext()}
                className={`flex-1 rounded-full py-3 text-sm font-bold text-white transition-all ${
                  canNext()
                    ? "animate-pulse-glow bg-gradient-to-r from-[#7B1FA2] to-[#E91E63] hover:scale-[1.02]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                지원 완료하기 🎉
              </button>
            )}
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
