/**
 * Categories.tsx — Danh mục nổi bật trang chủ
 */

const CATEGORIES = [
    {
      id: 1,
      name: "Điện thoại",
      count: "1.200+ sản phẩm",
      icon: "📱",
      hot: true,
      color: "#e31837",
      bg: "#fff5f7",
      image: "https://images.unsplash.com/photo-1760900051041-90417b9c110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 2,
      name: "Laptop",
      count: "850+ sản phẩm",
      icon: "💻",
      hot: false,
      color: "#2563eb",
      bg: "#eff6ff",
      image: "https://images.unsplash.com/photo-1642943038577-eb4a59549766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 3,
      name: "Tai nghe",
      count: "650+ sản phẩm",
      icon: "🎧",
      hot: true,
      color: "#7c3aed",
      bg: "#f5f3ff",
      image: "https://images.unsplash.com/photo-1764493824817-ba770988de79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 4,
      name: "Smart TV",
      count: "320+ sản phẩm",
      icon: "📺",
      hot: false,
      color: "#0891b2",
      bg: "#ecfeff",
      image: "https://images.unsplash.com/photo-1758577515339-93872db0d37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 5,
      name: "Máy ảnh",
      count: "420+ sản phẩm",
      icon: "📷",
      hot: false,
      color: "#d97706",
      bg: "#fffbeb",
      image: "https://images.unsplash.com/photo-1729655669048-a667a0b01148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 6,
      name: "Gaming",
      count: "780+ sản phẩm",
      icon: "🎮",
      hot: true,
      color: "#16a34a",
      bg: "#f0fdf4",
      image: "https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 7,
      name: "Smartwatch",
      count: "280+ sản phẩm",
      icon: "⌚",
      hot: false,
      color: "#be185d",
      bg: "#fdf2f8",
      image: "https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 8,
      name: "Máy tính bảng",
      count: "480+ sản phẩm",
      icon: "📟",
      hot: true,
      color: "#ea580c",
      bg: "#fff7ed",
      image: "https://images.unsplash.com/photo-1759820941220-fed6a1010146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ];
  
  /* Icon mũi tên */
  function ArrowIcon({ color }: { color: string }) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    );
  }
  
  export function Categories() {
    return (
      <section className="categories-section">
        <div className="container">
  
          {/* ── Section header ── */}
          <div className="section-header">
            <div className="section-title" style={{ marginBottom: 0 }}>
              <div className="section-label">
                <span className="accent-bar" />
                DANH MỤC SẢN PHẨM
              </div>
              <h2>
                Khám Phá <span>Danh Mục Nổi Bật</span>
              </h2>
            </div>
            <a href="#" className="view-all-link">
              Tất cả danh mục
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
  
          {/* ── Grid ── */}
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <a key={cat.id} href="#" className="cat-card">
                {/* Image */}
                <div className="cat-card__image">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="cat-card__img"
                    loading="lazy"
                  />
                  <div className="cat-card__overlay" />
                  {/* Icon */}
                  <div className="cat-card__icon">{cat.icon}</div>
                  {/* HOT badge */}
                  {cat.hot && (
                    <div className="cat-card__hot">
                      <span className="badge badge-shimmer">HOT</span>
                    </div>
                  )}
                </div>
  
                {/* Info */}
                <div className="cat-card__info">
                  <div>
                    <div className="cat-card__name">{cat.name}</div>
                    <div className="cat-card__count">{cat.count}</div>
                  </div>
                  <div
                    className="cat-card__arrow"
                    style={{ background: cat.bg }}
                  >
                    <ArrowIcon color={cat.color} />
                  </div>
                </div>
              </a>
            ))}
          </div>
  
        </div>
      </section>
    );
  }
  