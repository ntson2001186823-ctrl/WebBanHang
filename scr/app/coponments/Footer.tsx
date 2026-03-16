/**
 * Footer.tsx — Footer chuẩn (copy sang các trang khác)
 * Chỉ cần import + render <Footer /> là xong
 */

const FOOTER_LINKS: Record<string, string[]> = {
    "Về TechShop": [
      "Giới thiệu công ty",
      "Tuyển dụng",
      "Tin tức công nghệ",
      "Quan hệ đối tác",
      "Liên hệ chúng tôi",
    ],
    "Chính sách": [
      "Chính sách bảo hành",
      "Chính sách đổi trả",
      "Chính sách vận chuyển",
      "Chính sách bảo mật",
      "Điều khoản sử dụng",
    ],
    "Hỗ trợ khách hàng": [
      "Hướng dẫn mua hàng",
      "Tra cứu đơn hàng",
      "Thanh toán trả góp",
      "Câu hỏi thường gặp",
      "Trung tâm bảo hành",
    ],
  };
  
  const PAYMENT_METHODS = [
    { label: "VISA",  bg: "#1a1f71" },
    { label: "MC",    bg: "#eb001b" },
    { label: "MoMo",  bg: "#a50064" },
    { label: "VNPay", bg: "#00457c" },
    { label: "COD",   bg: "#16a34a" },
    { label: "ZaloPay", bg: "#0068ff" },
  ];
  
  const POLICIES = [
    {
      title: "Miễn phí vận chuyển",
      sub: "Đơn hàng từ 500.000đ",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
    },
    {
      title: "Bảo hành chính hãng",
      sub: "12 tháng toàn quốc",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      title: "Đổi trả dễ dàng",
      sub: "Trong vòng 30 ngày",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
        </svg>
      ),
    },
    {
      title: "Hỗ trợ 24/7",
      sub: "Hotline: 1900 1234",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
  ];
  
  export function Footer() {
    return (
      <footer>
        {/* ════════════════════════════════
            POLICY STRIP
            ════════════════════════════════ */}
        <div className="footer-policy">
          <div className="container">
            <div className="footer-policy__grid">
              {POLICIES.map((p, i) => (
                <div key={i} className="footer-policy__item">
                  <div className="footer-policy__icon">{p.icon}</div>
                  <div>
                    <div className="footer-policy__title">{p.title}</div>
                    <div className="footer-policy__sub">{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* ════════════════════════════════
            MAIN FOOTER
            ════════════════════════════════ */}
        <div className="site-footer">
          <div className="container">
  
            {/* Grid: Brand + 3 link columns */}
            <div className="footer-main">
  
              {/* Brand column */}
              <div>
                {/* Logo */}
                <div className="footer-brand__logo">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 44, height: 44,
                      background: "var(--main-color)",
                      borderRadius: "var(--radius)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: "1.3rem", fontWeight: 900,
                    }}>T</div>
                    <div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "white" }}>
                        TECH<span style={{ color: "var(--main-color-light)" }}>SHOP</span>
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "#4b5563" }}>
                        Điện tử chính hãng số 1 Việt Nam
                      </div>
                    </div>
                  </div>
                </div>
  
                <p className="footer-brand__desc">
                  TechShop là hệ thống bán lẻ điện tử uy tín hàng đầu Việt Nam, cung cấp sản phẩm
                  chính hãng với giá tốt nhất. Hơn 200+ cửa hàng toàn quốc, phục vụ triệu khách hàng.
                </p>
  
                {/* Contact */}
                <div className="footer-contact">
                  {[
                    { icon: "📍", text: "123 Đường Cách Mạng Tháng 8, Q.3, TP.HCM" },
                    { icon: "📞", text: "Hotline: 1900 1234 (8:00 – 22:00 mỗi ngày)" },
                    { icon: "✉️", text: "support@techshop.vn" },
                  ].map((c, i) => (
                    <div key={i} className="footer-contact__item">
                      <span>{c.icon}</span>
                      <span>{c.text}</span>
                    </div>
                  ))}
                </div>
  
                {/* Social */}
                <div className="footer-social">
                  {[
                    { label: "f",   bg: "#1877f2", title: "Facebook" },
                    { label: "▶",  bg: "#ff0000", title: "YouTube" },
                    { label: "ig",  bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", title: "Instagram" },
                    { label: "tt",  bg: "#000",    title: "TikTok" },
                  ].map((s, i) => (
                    <a key={i} href="#" title={s.title} className="footer-social__btn"
                      style={{ background: s.bg }}>
                      {s.label}
                    </a>
                  ))}
                  <a href="#" style={{ fontSize: "0.7rem", color: "#374151", marginLeft: 6, alignSelf: "center" }}>
                    Đã thông báo Bộ Công Thương
                  </a>
                </div>
              </div>
  
              {/* Link columns */}
              {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                <div key={title} className="footer-col">
                  <h4>{title}</h4>
                  <ul>
                    {links.map(link => (
                      <li key={link}><a href="#">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
  
            {/* ─ Bottom: Newsletter + Payments ─ */}
            <div className="footer-bottom">
              <div className="footer-bottom__inner">
  
                {/* Newsletter */}
                <div className="footer-newsletter">
                  <div className="footer-newsletter__label">
                    <strong>Đăng ký nhận ưu đãi</strong><br />
                    <span>Nhận thông báo khuyến mãi mới nhất</span>
                  </div>
                  <div className="input-group" style={{ borderColor: "#374151", background: "#1f2937", minWidth: 260 }}>
                    <input
                      type="email"
                      placeholder="Nhập email của bạn..."
                      style={{ background: "transparent", color: "white" }}
                    />
                    <button type="button" style={{ display: "flex", alignItems: "center", gap: 6, paddingRight: 16, paddingLeft: 16 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Đăng ký
                    </button>
                  </div>
                </div>
  
                {/* Payments */}
                <div className="footer-payments">
                  <span className="footer-payments__label">Thanh toán:</span>
                  {PAYMENT_METHODS.map(p => (
                    <span key={p.label} className="pay-badge" style={{ background: p.bg }}>
                      {p.label}
                    </span>
                  ))}
                  <span className="pay-badge" style={{ background: "#374151", display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    ATM
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="footer-copyright">
            © 2025 TechShop Vietnam · Bản quyền thuộc về TechShop ·
            GPKD: 0123456789 do Sở KH&amp;ĐT TP.HCM cấp ·
            <a href="#" style={{ color: "var(--main-color)", marginLeft: 6 }}>
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </footer>
    );
  }
  