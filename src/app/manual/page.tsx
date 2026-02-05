"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManualPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // 세션 체크
  useEffect(() => {
    const auth = sessionStorage.getItem("manual_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인 (노션 페이지 ID의 앞 8자리)
    const correctPassword = "2fe2ecf5";

    if (password === correctPassword) {
      sessionStorage.setItem("manual_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("manual_auth");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                관리자 인증
              </h1>
              <p className="text-gray-500">
                노션 데이터베이스 관리 매뉴얼
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                접속하기
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
                >
                  ← 메인으로 돌아가기
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                💡 힌트: 노션 페이지 ID의 앞 8자리
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-900">관리자 매뉴얼</h1>
                <p className="text-xs text-gray-500">노션 데이터베이스 업데이트 가이드</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
              >
                메인으로
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* iframe으로 HTML 매뉴얼 표시 */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe
            src="/docs/NOTION_UPDATE_MANUAL.html"
            className="w-full"
            style={{ height: "calc(100vh - 120px)", minHeight: "600px" }}
            title="노션 업데이트 매뉴얼"
          />
        </div>
      </div>
    </div>
  );
}
