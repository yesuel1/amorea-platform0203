import Link from "next/link";
import { counselors } from "@/data/counselors";

export default function Home() {

  const reviews = [
    {
      name: "김서연",
      age: "38세 · 육아맘",
      rating: 5,
      text: "아이 둘 키우면서 나를 잃어가던 중 아모레를 만났어요. 피부도 좋아지고, 카운셀러 활동으로 용돈도 벌고, 무엇보다 '나'를 되찾은 느낌이에요.",
    },
    {
      name: "이하은",
      age: "42세 · 자영업자",
      rating: 5,
      text: "카페 운영하면서 시작한 아모레 카운셀러. 고객들한테 저속노화 팁 알려주다 보니 단골도 늘고, 추가 수익까지. 1석3조예요!",
    },
    {
      name: "박지민",
      age: "35세 · N잡러",
      rating: 5,
      text: "블로그 하면서 뷰티 콘텐츠 만들다가 카운셀러 시작했어요. 퍼스널 브랜딩에 이만한 게 없어요. 수익도 꾸준히 올라가고 있어요.",
    },
  ];

  const journeySteps = [
    {
      step: "01",
      title: "나를 위한 역노화",
      desc: "전문 교육으로 저속노화 비법을 내 몸에 먼저 적용합니다.",
      icon: "🌱",
    },
    {
      step: "02",
      title: "변화를 공유",
      desc: "내 경험과 변화를 SNS·블로그로 공유하며 퍼스널 브랜드를 키웁니다.",
      icon: "📱",
    },
    {
      step: "03",
      title: "함께 성장",
      desc: "주변 사람들에게 건강한 아름다움을 전하고 추가 수익을 만듭니다.",
      icon: "🚀",
    },
    {
      step: "04",
      title: "자아실현",
      desc: "뷰티 전문가로서 나만의 커리어를 완성합니다.",
      icon: "👑",
    },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7B1FA2] to-[#E91E63]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">AMOREA</span>{" "}
              <span className="text-gray-400 text-xs font-normal">분당점</span>
            </span>
          </a>
          <div className="hidden gap-6 text-sm font-medium text-gray-600 sm:flex">
            <a href="#about" className="hover:text-[#7B1FA2] transition-colors">역노화란</a>
            <a href="#counselors" className="hover:text-[#7B1FA2] transition-colors">카운셀러</a>
            <a href="#reviews" className="hover:text-[#7B1FA2] transition-colors">후기</a>
            <a href="#recruit" className="hover:text-[#7B1FA2] transition-colors">함께하기</a>
          </div>
          <a
            href="#recruit"
            className="hidden rounded-full bg-gradient-to-r from-[#7B1FA2] to-[#E91E63] px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 sm:inline-block"
          >
            카운셀러 지원
          </a>
        </div>
      </nav>

      {/* ==================== 히어로 섹션 ==================== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
        {/* 배경 그라데이션 + 장식 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f0517 0%, #1a0a2e 25%, #2d1b4e 50%, #4a1942 75%, #1a0a2e 100%)",
          }}
        />
        {/* 글로우 오브 장식 */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-[#7B1FA2]/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#E91E63]/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9C27B0]/10 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* 배지 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E91E63] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E91E63]" />
            </span>
            <span className="text-xs font-medium text-white/80">저속노화 · 역노화 뷰티 플랫폼</span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-6xl sm:leading-[1.15]">
            나이는 숫자일 뿐,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #F06292, #CE93D8, #F06292)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              되돌리는 아름다움
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            아모레 분당점에서 시작하는{" "}
            <span className="font-semibold text-[#F06292]">저속노화 · 역노화</span> 라이프.
            <br className="hidden sm:block" />
            건강하게 아름다워지면서, 나만의 브랜드와 수익까지 만들어보세요.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#about"
              className="animate-pulse-glow w-full rounded-full bg-gradient-to-r from-[#7B1FA2] to-[#E91E63] px-10 py-4 text-sm font-bold text-white transition-transform hover:scale-105 sm:w-auto"
            >
              역노화의 비밀 알아보기
            </a>
            <a
              href="#recruit"
              className="w-full rounded-full border border-white/20 bg-white/5 px-10 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              카운셀러로 함께하기
            </a>
          </div>

          {/* 키워드 태그 */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["#저속노화", "#역노화", "#셀프뷰티", "#퍼스널브랜딩"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 스크롤 유도 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ==================== 역노화란? 섹션 ==================== */}
      <section id="about" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#F3E5F5] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FCE4EC] blur-[80px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#F3E5F5] px-4 py-1 text-xs font-bold text-[#7B1FA2]">
              REVERSE AGING
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              <span className="gradient-text">저속노화 · 역노화</span>란?
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
              단순히 늙지 않는 것이 아닙니다. 세포부터 피부, 체형, 마인드까지
              <br className="hidden sm:block" />
              <span className="font-semibold text-gray-700">시간을 되돌리는 과학적 뷰티 라이프스타일</span>입니다.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: "🧬",
                title: "세포 레벨 케어",
                desc: "피부 장벽 강화, 콜라겐 부스팅, 항산화 영양 공급으로 세포부터 젊어집니다.",
                gradient: "from-[#7B1FA2]/10 to-[#9C27B0]/5",
              },
              {
                icon: "🌿",
                title: "이너뷰티",
                desc: "장 건강, 호르몬 밸런스, 수면 관리까지. 안에서부터 빛나는 진짜 아름다움.",
                gradient: "from-[#E91E63]/10 to-[#F06292]/5",
              },
              {
                icon: "💫",
                title: "라이프스타일 리셋",
                desc: "식습관, 운동, 스트레스 관리. 일상 전체를 역노화 루틴으로 바꿉니다.",
                gradient: "from-[#9C27B0]/10 to-[#CE93D8]/5",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl bg-gradient-to-br ${item.gradient} p-8 transition-transform hover:-translate-y-1`}
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 카운셀러 소개 섹션 ==================== */}
      <section id="counselors" className="bg-[#FAFAFA] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#FCE4EC] px-4 py-1 text-xs font-bold text-[#E91E63]">
              EXPERT TEAM
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              역노화 전문 뷰티 카운셀러
            </h2>
            <p className="mx-auto max-w-lg text-base text-gray-500">
              아모레퍼시픽 전문 교육을 이수한 카운셀러가 당신의 역노화 여정을 함께합니다.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {counselors.map((c, idx) => (
              <Link
                key={c.id}
                href={`/counselors/${c.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* 카드 상단 그라데이션 */}
                <div
                  className="flex h-36 items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${
                      idx % 2 === 0 ? "#7B1FA2" : "#E91E63"
                    } 0%, ${idx % 2 === 0 ? "#E91E63" : "#9C27B0"} 100%)`,
                  }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-4xl backdrop-blur-sm transition-transform group-hover:scale-110">
                    {c.emoji}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="mb-1 text-lg font-bold text-gray-900">{c.name}</h3>
                  <span className="mb-3 inline-block rounded-full bg-gradient-to-r from-[#7B1FA2]/10 to-[#E91E63]/10 px-3 py-1 text-xs font-bold text-[#7B1FA2]">
                    {c.role}
                  </span>
                  <p className="text-sm leading-relaxed text-gray-500">{c.shortDesc}</p>
                </div>
                <div className="border-t border-gray-100 px-6 py-3 text-center text-xs font-semibold text-[#7B1FA2] opacity-0 transition-opacity group-hover:opacity-100">
                  프로필 보기 →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 성장 여정 섹션 ==================== */}
      <section
        className="relative overflow-hidden px-4 py-24 sm:px-6"
        style={{
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)",
        }}
      >
        <div className="absolute top-1/3 left-0 h-64 w-64 rounded-full bg-[#7B1FA2]/15 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#E91E63]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-bold text-[#F06292]">
              YOUR JOURNEY
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
              아름다움에서 자아실현까지
            </h2>
            <p className="mx-auto max-w-lg text-base text-white/60">
              건강하게 아름다워지고, 그 경험을 나누며, 나만의 커리어를 만들어가는 여정
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((s, idx) => (
              <div key={s.step} className="group relative">
                {/* 연결선 (모바일에서는 숨김) */}
                {idx < journeySteps.length - 1 && (
                  <div className="absolute top-10 left-[calc(50%+40px)] hidden h-0.5 w-[calc(100%-40px)] bg-gradient-to-r from-[#7B1FA2]/30 to-[#E91E63]/30 lg:block" />
                )}
                <div className="glass-card flex flex-col items-center rounded-2xl p-8 text-center transition-all hover:-translate-y-1 hover:bg-white/12">
                  <div className="mb-4 text-4xl">{s.icon}</div>
                  <span className="mb-2 text-xs font-bold text-[#F06292]">STEP {s.step}</span>
                  <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 타겟 페르소나 섹션 ==================== */}
      <section className="bg-white px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#F3E5F5] px-4 py-1 text-xs font-bold text-[#7B1FA2]">
              FOR YOU
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              이런 분들과 함께합니다
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                emoji: "👩‍👧‍👦",
                title: "육아맘",
                desc: "아이를 키우면서도 나만의 시간, 나만의 수익, 나만의 아름다움을 포기하지 마세요.",
                color: "#E91E63",
              },
              {
                emoji: "🏪",
                title: "자영업자",
                desc: "기존 사업에 뷰티를 더해 고객 경험을 높이고 추가 매출을 만들어보세요.",
                color: "#9C27B0",
              },
              {
                emoji: "💻",
                title: "N잡러",
                desc: "블로그, SNS 콘텐츠와 시너지를 내는 뷰티 퍼스널 브랜딩의 시작.",
                color: "#7B1FA2",
              },
              {
                emoji: "✨",
                title: "뷰티 러버",
                desc: "좋아하는 것을 직업으로. 역노화 뷰티 전문가로 성장하세요.",
                color: "#E91E63",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-gray-100 p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${p.color}10` }}
                >
                  {p.emoji}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 고객 후기 섹션 ==================== */}
      <section id="reviews" className="bg-[#FAFAFA] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#FCE4EC] px-4 py-1 text-xs font-bold text-[#E91E63]">
              REAL STORIES
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              함께한 분들의 이야기
            </h2>
            <p className="mx-auto max-w-lg text-base text-gray-500">
              아름다움과 수익, 자아실현까지 경험한 리얼 후기
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* 장식 */}
                <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-[#7B1FA2]/5 to-[#E91E63]/5" />

                {/* 별점 */}
                <div className="mb-4 flex gap-0.5">
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

                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-bold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 리쿠르팅 CTA 섹션 ==================== */}
      <section
        id="recruit"
        className="relative overflow-hidden px-4 py-24 sm:px-6"
        style={{
          background: "linear-gradient(135deg, #7B1FA2 0%, #E91E63 50%, #FF5722 100%)",
        }}
      >
        {/* 장식 원 */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-sm" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/5 blur-sm" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-semibold text-white">2025 카운셀러 모집 중</span>
          </div>

          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-5xl">
            아모레 카운셀러가
            <br />
            되어보세요
          </h2>

          <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            건강하게 아름다워지면서 <span className="font-bold text-white">퍼스널 브랜딩</span>과{" "}
            <span className="font-bold text-white">추가 수익</span>까지.
            <br />
            당신의 경험이 누군가의 변화가 됩니다.
          </p>

          {/* 해시태그 */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {[
              "#뷰티인플루언서",
              "#워라벨",
              "#N잡",
              "#퍼스널브랜딩",
              "#자아실현",
              "#추가수익",
              "#육아맘환영",
              "#저속노화전문가",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/25"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 혜택 */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "📚", title: "전문 교육 무료", desc: "역노화 뷰티 전문가 교육" },
              { icon: "💰", title: "유연한 수익", desc: "내 속도에 맞는 활동과 보상" },
              { icon: "🎯", title: "퍼스널 브랜딩", desc: "나만의 뷰티 브랜드 구축 지원" },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-white/10 p-5 backdrop-blur-sm">
                <div className="mb-2 text-2xl">{b.icon}</div>
                <h3 className="mb-1 text-sm font-bold text-white">{b.title}</h3>
                <p className="text-xs text-white/70">{b.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-block rounded-full bg-white px-12 py-4 text-sm font-bold text-[#7B1FA2] shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            지금 바로 지원하기
          </a>
        </div>
      </section>

      {/* ==================== 푸터 ==================== */}
      <footer className="bg-[#0f0517] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-3">
            {/* 매장 정보 */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7B1FA2] to-[#E91E63]">
                  <span className="text-sm font-bold text-white">A</span>
                </div>
                <span className="text-lg font-bold text-white">AMOREA</span>
                <span className="text-xs text-gray-500">분당점</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>경기도 성남시 분당구 서현로 000</li>
                <li>영업시간: 10:00 - 21:00</li>
                <li>전화: 031-000-0000</li>
                <li>이메일: bundang@amorea.kr</li>
              </ul>
            </div>

            {/* 바로가기 */}
            <div>
              <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">바로가기</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#about" className="transition-colors hover:text-white">역노화란</a></li>
                <li><a href="#counselors" className="transition-colors hover:text-white">카운셀러 소개</a></li>
                <li><a href="#reviews" className="transition-colors hover:text-white">후기</a></li>
                <li><a href="#recruit" className="transition-colors hover:text-white">카운셀러 지원</a></li>
              </ul>
            </div>

            {/* SNS */}
            <div>
              <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-500 transition-all hover:bg-[#7B1FA2] hover:text-white" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-500 transition-all hover:bg-[#E91E63] hover:text-white" aria-label="YouTube">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-500 transition-all hover:bg-[#9C27B0] hover:text-white" aria-label="Blog">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h4v3H6V8zm0 5h12v2H6v-2zm6-5h6v3h-6V8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-gray-600">
            &copy; 2025 AMOREA 분당점. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
