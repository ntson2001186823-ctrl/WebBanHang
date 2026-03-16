/**
 * Header.tsx — Header chuẩn (copy sang các trang khác)
 * Chỉ cần import + render <Header /> là xong
 */
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  {
    label: "Điện thoại", icon: "📱",
    sub: ["iPhone 16 Series", "Samsung Galaxy S25", "Xiaomi 14 Ultra", "OPPO Find X8", "Vivo X200"],
  },
  {
    label: "Laptop", icon: "💻",
    sub: ["MacBook Air / Pro", "Dell XPS & Alienware", "HP Spectre", "Lenovo ThinkPad", "ASUS ROG"],
  },
  {
    label: "Máy tính bảng", icon: "📟",
    sub: ["iPad Pro M4", "Samsung Galaxy Tab", "Xiaomi Pad 7"],
  },
  {
    label: "Tai nghe", icon: "🎧",
    sub: ["True Wireless", "Chụp tai ANC", "Gaming Headset", "Studio"],
  },
  {
    label: "Smart TV", icon: "📺",
    sub: ["OLED 4K", "QLED Samsung", "Màn hình Gaming", "Máy chiếu"],
  },
  {
    label: "Máy ảnh", icon: "📷",
    sub: ["Mirrorless", "DSLR", "Compact", "Action Cam"],
  },
  {
    label: "Gaming", icon: "🎮",
    sub: ["PS5 Console", "Xbox Series X", "Nintendo Switch", "Ghế gaming"],
  },
];

const SEARCH_HINTS = ["iPhone 16 Pro", "MacBook M3", "Samsung S25", "AirPods Pro", "PS5"];

export function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      {/* ════════════════════════════════
          TOP BAR — Ticker + Liên hệ
          ════════════════════════════════ */}
      <div className="topbar">
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Ticker chạy */}
          <div className="topbar__ticker" style={{ flex: 1, overflow: "hidden" }}>
            <span className="topbar__ticker-track">
              🔥 Siêu Sale Tháng 3 — Giảm đến 50%! &nbsp;&nbsp;&nbsp;
              📦 Miễn phí ship đơn từ 500K &nbsp;&nbsp;&nbsp;
              🎁 Tặng tai nghe 500K khi mua Laptop &nbsp;&nbsp;&nbsp;
              ⚡ Flash Sale 12:00 hôm nay — Đặt hàng ngay! &nbsp;&nbsp;&nbsp;
              🛡️ Bảo hành chính hãng 12 tháng toàn quốc &nbsp;&nbsp;&nbsp;
            </span>
          </div>
          {/* Liên hệ */}
          <div className="topbar__contacts">
            <a href="tel:19001234">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              1900 1234
            </a>
            <a href="mailto:support@techshop.vn" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              support@techshop.vn
            </a>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              200+ cửa hàng
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          MAIN HEADER
          ════════════════════════════════ */}
      <div className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="header-main">

            {/* Logo */}
            <a href="#" className="logo">
              <div className="logo__icon">T</div>
              <div className="logo__text" style={{ display: "block" }}>
                <div className="logo__brand">
                  TECH<span>SHOP</span>
                </div>
                <div className="logo__tagline">Điện tử chính hãng</div>
              </div>
            </a>

            {/* Search */}
            <div className="header-search">
              <div className="search-box">
                <div className="search-box__category">
                  Tất cả
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm điện thoại, laptop, tai nghe..."
                  aria-label="Tìm kiếm sản phẩm"
                />
                <button className="search-box__btn" type="button">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Tìm kiếm
                </button>
              </div>
              <div className="search-hints" style={{ display: "flex" }}>
                <span className="search-hints__label">Gợi ý:</span>
                {SEARCH_HINTS.map(h => <a key={h} href="#">{h}</a>)}
              </div>
            </div>

            {/* Actions */}
            <div className="header-actions">
              {/* Wishlist */}
              <button className="hdr-btn hdr-btn--wish" aria-label="Yêu thích">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" style={{ color: "var(--main-color)" }} stroke="var(--main-color)"/></svg>
                <span className="hdr-badge">5</span>
              </button>

              {/* Account */}
              <button className="hdr-btn hdr-btn--user" aria-label="Tài khoản">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Đăng nhập</span>
              </button>

              {/* Cart */}
              <button className="hdr-btn hdr-btn--cart" aria-label="Giỏ hàng">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Giỏ hàng</span>
                <span className="hdr-badge" style={{ background: "#fde047", color: "#1a1a1a", border: "2px solid white" }}>3</span>
              </button>

              {/* Mobile hamburger */}
              <button
                className="mobile-menu-btn"
                aria-label="Menu"
                onClick={() => setMobileOpen(o => !o)}
              >
                {mobileOpen ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
            <div className="mobile-menu__search">
              <div className="search-box">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <button className="search-box__btn" type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
              </div>
            </div>
            <div className="mobile-menu__nav">
              {NAV_ITEMS.map(item => (
                <a key={item.label} href="#">
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  {item.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: "auto" }}><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ════ NAVBAR ════ */}
        <div className="nav-bar">
          <div className="container">
            <nav className="nav-bar__inner">
              {NAV_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  className="nav-item"
                  onMouseEnter={() => setActiveDropdown(i)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a href="#" className="nav-link">
                    <span>{item.icon}</span>
                    {item.label}
                    <span className="nav-arrow">▾</span>
                  </a>
                  {/* Dropdown */}
                  <div className="nav-dropdown">
                    {item.sub.map(s => (
                      <a key={s} href="#">{s}</a>
                    ))}
                  </div>
                </div>
              ))}

              {/* Services right */}
              <div className="nav-services">
                <span className="nav-service">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  Giao hỏa tốc
                </span>
                <span className="nav-service">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  BH 12 tháng
                </span>
                <span className="nav-service">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                  Đổi 30 ngày
                </span>
                <span className="nav-service">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                  Hỗ trợ 24/7
                </span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
