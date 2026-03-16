/**
 * App.tsx — Trang chủ (index.html)
 * Cấu trúc: Header → main → Footer
 *
 * CSS thứ tự import:
 *   1. base.css  (biến màu, reset, class dùng chung)
 *   2. home.css  (styles & animation riêng trang chủ)
 */
import "../styles/base.css";
import "../styles/home.css";

import { Header }       from "./components/Header";
import { BannerSlider } from "./components/BannerSlider";
import { Categories }   from "./components/Categories";
import { Footer }       from "./components/Footer";

export default function App() {
  return (
    <div style={{ fontFamily: "var(--font-main)" }}>

      {/* =============================================
          HEADER — copy sang trang khác: <Header />
          ============================================= */}
      <Header />

      {/* =============================================
          TRANG CHỦ (home.html / index.html)
          ============================================= */}
      <main>
        {/* Slider banner tự động — js/home.js */}
        <BannerSlider />

        {/* Danh mục nổi bật */}
        <Categories />
      </main>

      {/* =============================================
          FOOTER — copy sang trang khác: <Footer />
          ============================================= */}
      <Footer />

    </div>
  );
}
