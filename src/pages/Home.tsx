import React, { useState, useEffect, useRef } from 'react';
import Portal from '../Portal';

// Custom lightweight inline SVG Icons representing Microsoft Core Brands
// To eliminate any external CDN load latency or render flickering.
const MicrosoftIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
    <rect x="12" y="0" width="11" height="11" fill="#7FBA00"/>
    <rect x="0" y="12" width="11" height="11" fill="#00A4EF"/>
    <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
  </svg>
);

const WindowsIcon = ({ colorClass = "text-[#0078d4]" }) => (
  <svg className={`w-8 h-8 ${colorClass}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
  </svg>
);

const OfficeIcon = () => (
  <svg className="w-8 h-8 text-[#f25022]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 0h-9L0 7.5v9L7.5 24h9l7.5-7.5v-9L16.5 0zm1.5 15.75l-3.75 3.75H10.5L6.75 15.75V10.5l3.75-3.75h3.75l3.75 3.75v5.25z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-8 h-8 text-[#8f00ff]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 6.5c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3zm0 1c-5.52 0-10-1.52-10-3.5v3.5c0 1.98 4.42 3.5 10 3.5s10-1.52 10-3.5V6c0 1.98-4.48 3.5-10 3.5zm0 4.5c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3zm0 1c-5.52 0-10-1.52-10-3.5v3.5c0 1.98 4.42 3.5 10 3.5s10-1.52 10-3.5v-3.5c0 1.98-4.48 3.5-10 3.5zm0 4.5c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3z" />
  </svg>
);

const PREMIUM_SKUS = [
  {
    id: 'win-11-pro',
    category: 'windows',
    title: 'Windows 11 Pro',
    subtitle: '适合高级个人、程序员和企业开发人员',
    price: 19.99,
    originalPrice: 199.00,
    tag: '秒级闪电发货',
    type: 'Retail 零售版',
    auditInfo: '支持SAM审计',
    features: [
      '100% 绑定个人微软账号 (MSA)',
      '支持设备无限次重装与重置',
      '官方原生下载及全功能更新'
    ],
    icon: <WindowsIcon />
  },
  {
    id: 'win-11-home',
    category: 'windows',
    title: 'Windows 11 Home',
    subtitle: '适合家庭及个人日常办公娱乐使用',
    price: 14.99,
    originalPrice: 139.00,
    tag: '秒级闪电发货',
    type: 'Retail 零售版',
    features: [
      '支持一次激活永久使用',
      '无缝自动获取安全更新',
      '支持官方正品防伪验证'
    ],
    icon: <WindowsIcon colorClass="text-[#00a4ef]" />
  },
  {
    id: 'win-10-pro',
    category: 'windows',
    title: 'Windows 10 Pro',
    subtitle: '针对老款配置电脑深度优化的稳定系统',
    price: 16.99,
    originalPrice: 149.00,
    tag: '秒级闪电发货',
    type: 'Retail 零售版',
    features: [
      '经典稳定系统，支持硬件升级',
      '极佳的旧软件与工业软件兼容性',
      '一键升级 Windows 11 专业版特权'
    ],
    icon: <WindowsIcon colorClass="text-[#7fba00]" />
  },
  {
    id: 'm365-personal',
    category: 'office',
    title: 'Microsoft 365 个人版',
    subtitle: '包含 1TB OneDrive 极速云盘及所有 Office 组件',
    price: 29.99,
    originalPrice: 69.99,
    tag: '秒级闪电发货',
    type: '1年个人订阅',
    features: [
      '支持 5 台设备同时在线登录使用',
      '绑定个人微软账户，自动续期激活',
      '内含高级版 Word, Excel, PPT, Outlook'
    ],
    icon: <OfficeIcon />
  },
  {
    id: 'm365-family',
    category: 'office',
    title: 'Microsoft 365 家庭版',
    subtitle: '支持多达 6 位家庭成员独立分配、独享 6TB 空间',
    price: 39.99,
    originalPrice: 99.99,
    tag: '性价比之王',
    type: '1年家庭订阅',
    features: [
      '每个账户独立 1TB 云存储，安全隔离',
      '支持 6 个微软邮箱独立加入绑定',
      '每位成员可在 5 台设备同时使用'
    ],
    icon: <OfficeIcon />
  },
  {
    id: 'm365-business',
    category: 'office',
    title: 'M365 商业标准版',
    subtitle: '专为中小企业合规审计设计的云+本地办公套餐',
    price: 49.99,
    originalPrice: 150.00,
    tag: '秒级闪电发货',
    type: '1年商业订阅',
    features: [
      '支持自定义企业邮箱域名 (Exchange)',
      '包含 Team, SharePoint 等协同工具',
      '提供完整的商业合规授权凭证'
    ],
    icon: <OfficeIcon />
  },
  {
    id: 'office-2026-pro',
    category: 'office',
    title: 'Office 2026 专业增强版',
    subtitle: '经典永久买断，一次性购买终身激活使用',
    price: 34.99,
    originalPrice: 439.00,
    tag: '秒级闪电发货',
    type: '永久买断版',
    features: [
      '无需年费，支持重装与硬件检测绑定',
      '经典 Access, Publisher 独家完整版',
      '企业合规首选，完全规避授权审计'
    ],
    icon: <OfficeIcon />
  },
  {
    id: 'office-2026-home',
    category: 'office',
    title: 'Office 2026 家庭学生版',
    subtitle: '专为 Mac 或 PC 用户深度定制的官方版',
    price: 24.99,
    originalPrice: 149.00,
    tag: '秒级闪电发货',
    type: '永久买断版',
    features: [
      '绑定个人 MSA 账号，无封锁危险',
      '支持 Mac 设备与 Windows 双系统',
      '经典核心 3 件套，轻量化部署'
    ],
    icon: <OfficeIcon />
  },
  {
    id: 'server-2025',
    category: 'server',
    title: 'Win Server 2025 标准版',
    subtitle: '包含 16 Core 授权，针对新一代硬件深度优化',
    price: 89.99,
    originalPrice: 1069.00,
    tag: '秒级闪电发货',
    type: 'Volume 批量版',
    features: [
      '支持物理机本地虚拟化与云端服务器部署',
      '高级别安全性与多层合规保护机制',
      '满足大企业 IT 架构审计要求'
    ],
    icon: <DatabaseIcon />
  },
  {
    id: 'sql-2025',
    category: 'server',
    title: 'SQL Server 25 Standard',
    subtitle: '高并发、高性能数据库官方安全授权密钥',
    price: 149.99,
    originalPrice: 1899.00,
    tag: '企业级首选',
    type: 'SQL Server',
    features: [
      '包含标准 5 CAL 访问授权许可',
      '激活状态永久保持有效，全生命期支持',
      '原版离线 ISO 物理验证激活'
    ],
    icon: <DatabaseIcon />
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(null);
  
  // Simulated Licenses purchased in this session
  const [purchasedLicenses, setPurchasedLicenses] = useState([
    {
      id: 'demo-win',
      title: 'Windows 11 Professional Retail',
      licenseType: '绑定账户版',
      key: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
      isOffice: false,
      link: 'https://www.microsoft.com/zh-cn/software-download/windows11'
    },
    {
      id: 'demo-office',
      title: 'Microsoft 365 Family Account',
      licenseType: '1年订阅绑定',
      key: 'Activated via official mail: customer-link-m365',
      isOffice: true,
      link: 'https://setup.office.com'
    }
  ]);

  // Checkout Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState({ title: '', price: 0 });
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [payMethod, setPayMethod] = useState(1);

  // Custom Toast State
  const [toast, setToast] = useState({ visible: false, message: '', icon: '🚀' });

  // Helper smooth scrolling for single page navigation
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 48; // nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const showToast = (message, icon = "🚀") => {
    setToast({ visible: true, message, icon });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const toggleFAQ = (id) => {
    setOpenFaqId(prevId => (prevId === id ? null : id));
  };

  const copyToClipboard = (text) => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand('copy');
      showToast("激活码/直连复制成功！快去激活吧！", "🟢");
    } catch (err) {
      showToast("复制失败，请手动选取复制。", "🔴");
    }
    document.body.removeChild(tempTextArea);
  };

  const openCheckoutDrawer = (productName, price) => {
    setCheckoutProduct({ title: productName, price });
    setIsDrawerOpen(true);
  };

  const closeCheckoutDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!checkoutEmail || !checkoutEmail.includes('@')) {
      showToast("请输入合规且正确的邮箱地址以便接受激活码。", "⚠️");
      return;
    }

    closeCheckoutDrawer();

    const isOfficeProduct = checkoutProduct.title.includes('Office') || checkoutProduct.title.includes('365');
    const mockKey = isOfficeProduct 
      ? 'M365F-ANNUAL-BIND-OK-KEY-' + Math.floor(10000 + Math.random() * 90000)
      : 'W11PR-OEM25-GENUINE-KEY-' + Math.floor(10000 + Math.random() * 90000);

    // Simulate order backend injection
    setTimeout(() => {
      const newLicense = {
        id: 'mock-' + Date.now(),
        title: checkoutProduct.title,
        licenseType: '官方正版授权',
        key: mockKey,
        isOffice: isOfficeProduct,
        link: isOfficeProduct ? 'https://setup.office.com' : 'https://www.microsoft.com/zh-cn/software-download/'
      };

      setPurchasedLicenses(prev => [newLicense, ...prev]);
      showToast(`模拟下发 [${checkoutProduct.title}] 激活密钥！`, "🟢");
      scrollToSection('portal');
    }, 500);
  };

  const handleB2BSubmit = (e) => {
    e.preventDefault();
    showToast("报价申请成功提交！专员将立即核发邮件给您！", "🔵");
    e.target.reset();
  };

  const simulateDirectOrder = (productName, isOffice, key) => {
    const newLicense = {
      id: 'sim-' + Date.now(),
      title: productName,
      licenseType: '官方正版授权',
      key: key,
      isOffice: isOffice,
      link: isOffice ? 'https://setup.office.com' : 'https://www.microsoft.com/zh-cn/software-download/'
    };
    setPurchasedLicenses(prev => [newLicense, ...prev]);
    showToast(`成功！模拟下发 [${productName}] 激活密钥！`, "🟢");
    scrollToSection('portal');
  };

  // Filtered SKUs
  const filteredSkus = PREMIUM_SKUS.filter(sku => 
    activeTab === 'all' || sku.category === activeTab
  );

  return (
    <div className="overflow-x-hidden bg-[#f5f5f7] text-[#1d1d1f] antialiased font-sans">
      
      {/* Navigation Bar */}

      {}
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-300/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          <p className="text-xs font-semibold text-[#86868b] tracking-wider uppercase mb-3">Genuine Microsoft Software Solutions</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#1d1d1f] mb-6 leading-tight">
            正版，从未如此轻松。
          </h1>
          <p className="text-lg sm:text-xl text-[#86868b] font-normal mb-8 max-w-2xl mx-auto leading-relaxed">
            微软官方授权合作伙伴。全线 10 款核心 SKU 现货直发，10 分钟内极速安全交付。专为企业合规审计与高级个人量身打造。
          </p>

          <div className="flex flex-col items-center justify-center gap-4 mb-16 sm:flex-row">
            <button 
              onClick={() => scrollToSection('store')} 
              className="w-full sm:w-auto bg-[#0078d4] hover:bg-[#0062b1] text-white font-medium px-8 py-3 rounded-full transition shadow-lg shadow-blue-500/10 text-center"
            >
              立即选购正版密钥
            </button>
            <button 
              onClick={() => scrollToSection('business')} 
              className="w-full sm:w-auto border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] font-medium px-8 py-3 rounded-full transition text-center"
            >
              企业批量授权方案 <span className="ml-1 text-xs">{" > "}</span>
            </button>
          </div>

          {/* Core Trust anchors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#f5f5f7]">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">10 Min</span>
              <span className="text-xs text-[#86868b] mt-1">🕒 自动闪电交付</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">98.7%</span>
              <span className="text-xs text-[#86868b] mt-1">⭐️ 客户满意好评率</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">50K+</span>
              <span className="text-xs text-[#86868b] mt-1">🛡️ 正版安全合规激活</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">100%</span>
              <span className="text-xs text-[#86868b] mt-1">✅ 官方在线/电话验证</span>
            </div>
          </div>
        </div>
      </section>

      {}
      {/* Store Section */}
      <section id="store" className="py-20 bg-[#f5f5f7]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-4">精心打磨的 10 款核心正版授权</h2>
            <p className="text-sm text-[#86868b]">按类目快速筛选。每个卡片均自带正版交付标签，保障您的资产合规无忧。</p>
          </div>

          {/* Filter Categories */}
          <div className="flex justify-center mb-10 py-2 overflow-x-auto">
            <div className="flex space-x-1.5 bg-white p-1.5 rounded-full border border-[#e8e8ed] shadow-[0_4px_12px_rgba(0,0,0,0.03)] whitespace-nowrap">
              <button 
                onClick={() => setActiveTab('all')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'all' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                全部商品 (10)
              </button>
              <button 
                onClick={() => setActiveTab('windows')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'windows' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                Windows 系统 (3)
              </button>
              <button 
                onClick={() => setActiveTab('office')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'office' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                Office 办公 (5)
              </button>
              <button 
                onClick={() => setActiveTab('server')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'server' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                服务器/SQL (2)
              </button>
            </div>
          </div>

          {/* 10 SKU Grid with Preserved Premium Copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkus.map((sku) => (
              <div 
                key={sku.id} 
                className="bg-white v5-card rounded-2xl border border-[#e8e8ed] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200">
                      ⚡ {sku.tag}
                    </span>
                    <span className="text-xs text-[#86868b]">{sku.type}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3.5 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl border border-gray-100">
                      {sku.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1d1d1f]">{sku.title}</h3>
                      <p className="text-xs text-[#86868b]">{sku.subtitle}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                    {sku.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-green-500 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-2xl font-extrabold text-[#1d1d1f]">${sku.price}</span>
                      <span className="text-xs text-[#86868b] line-through ml-1.5">${sku.originalPrice}</span>
                    </div>
                    {sku.auditInfo && (
                      <span className="text-[11px] text-[#0078d4] font-medium">✓ {sku.auditInfo}</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => openCheckoutDrawer(sku.title, sku.price)} 
                    className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1"
                  >
                    <span>立即购买</span> <span className="text-[10px]">{" > "}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      {/* B2B Section */}
      <section id="business" className="relative py-24 bg-[#161617] text-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            
            {/* Business value propositions */}
            <div>
              <span className="text-[#0078d4] text-xs font-bold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Enterprise B2B Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-6 mb-6 leading-tight">
                企业正版化合规与 SAM 审计专家支持
              </h2>
              <p className="text-sm text-[#86868b] leading-relaxed mb-8">
                在面临微软官方合规审计（SAM Audit）时，不透明的采购链条常使企业处于被动地位。我们提供符合官方资质的批量授权（Volume Licensing）证书与正版密钥，助力中小企业低成本、极速实现百分之百资产合规，避免高昂法律红线处罚。
              </p>

              <div className="space-y-4">
                <div className="flex space-x-4 v5-card-light bg-white/5 p-4 rounded-xl border border-white/10 hover:border-blue-500/40 transition duration-300">
                  <div className="text-[#0078d4] text-xl pt-0.5">🛡️</div>
                  <div>
                    <h4  className="text-sm font-semibold">100% 通过官方合规验证</h4>
                    <p className="text-xs text-[#86868b] mt-1">完美符合企业合规要求，提供正规采购链条合同，支持通过任何国家或地区的本地软件合规审计。</p>
                  </div>
                </div>
                <div className="flex space-x-4 v5-card-light bg-white/5 p-4 rounded-xl border border-white/10 hover:border-blue-500/40 transition duration-300">
                  <div className="text-[#34c759] text-xl pt-0.5">💰</div>
                  <div>
                    <h4  className="text-sm font-semibold">批量定价折扣（Up to 70% Off）</h4>
                    <p className="text-xs text-[#86868b] mt-1">支持 5+ 账号及系统部署规模，无最低起征门槛，提供更灵活的企业云迁移授权机制（CSP）。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Interactive Intake Form */}
            <div className="bg-white text-[#1d1d1f] p-8 rounded-2xl border border-[#e8e8ed] shadow-2xl relative">
              <h3 className="text-xl font-bold mb-2">获取免费企业正版化方案</h3>
              <p className="text-xs text-[#86868b] mb-6">我们的专家将提供一对一选型服务，并在 30 分钟内为您输出高性价比省钱报价书。</p>
              
              <form onSubmit={handleB2BSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#1d1d1f] mb-1">企业/机构名称</label>
                  <input type="text" required placeholder="如：北京智合科技有限公司" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">预估需要授权数量</label>
                    <select className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition">
                      <option>5 - 20 套</option>
                      <option>21 - 50 套</option>
                      <option>51 - 100 套</option>
                      <option>100套以上</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">主要产品需求</label>
                    <select className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition">
                      <option>Windows 11 系列</option>
                      <option>Microsoft 365 商业版</option>
                      <option>Windows Server / SQL</option>
                      <option>全线整体合规方案</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">联系人姓名</label>
                    <input type="text" required placeholder="张经理" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">联系电话 / 邮箱</label>
                    <input type="text" required placeholder="manager@company.com" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-bold py-3.5 rounded-lg transition shadow-lg shadow-blue-500/10">
                    免费获取定制报价与方案
                  </button>
                </div>
                <p className="text-[10px] text-center text-[#86868b] mt-3">🔒 您的隐私受欧盟GDPR与中国个人信息保护法加密保护，绝对不泄露予任何官方三方审计。</p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* Compare Section */}
      <section id="compare" className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <p className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase mb-2">Comparison Matrix</p>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">哪款授权模式适合您的团队？</h2>
            <p className="text-sm text-[#86868b] mt-3">通过经典的对比维度，快速定位最合算的方案购买类型。</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e8e8ed] shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-[#f5f5f7] border-b border-[#e8e8ed]">
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">对比维度</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">个人与工作室 (Retail)</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">中小企业首选 (CSP/ESD)</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">大型集团与服务器 (Volume)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f7] text-xs text-[#1d1d1f]/80">
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">核心特点</td>
                  <td className="p-6">价格最低、绑定微软账户、一机一码。</td>
                  <td className="p-6">管理简便，支持绑定公司邮箱/域。</td>
                  <td className="p-6">一个主密钥多激活、支持纯局域网脱机合规激活。</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">授权所有权</td>
                  <td className="p-6">个人持有 / 永久属于该账户</td>
                  <td className="p-6">企业集中管理 / 随时回收重分配</td>
                  <td className="p-6">企业法人终身拥有 / 合规证明齐全</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">重装与重置支持</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ 完美支持</span> (无限制)</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ 完美支持</span> (随时解绑)</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ 完美支持</span> (后台静默自动)</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">支持官方审计 (SAM)</td>
                  <td className="p-6">✓ 属于个人资产合规</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ 完美合规通过</span></td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ 顶级合规金牌保障</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {}
      {/* Support & FAQ Section */}
      <section id="support" className="py-20 bg-[#f5f5f7]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase mb-2">Help & Guides</span>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">全方位的技术支持中心</h2>
            <p className="text-sm text-[#86868b] mt-3">支持自助查询激活常见指南。我们承诺不仅向您售卖密钥，更包办后期所有安全部署。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">🔑</div>
              <h4 className="text-base font-bold mb-2">激活码常见问题 (Activation Guide)</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">如何正确在设备中输入 Retail 密钥并完成和个人微信号的官方云绑定。</p>
              <button onClick={() => scrollToSection('portal')} className="text-xs font-semibold text-[#0078d4] hover:underline focus:outline-none text-left">立即前往用户后台查看 &gt;</button>
            </div>
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">📦</div>
              <h4 className="text-base font-bold mb-2">Office 部署安装指南 (Setup)</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">如何完全清除电脑里的野蛮盗版 Office残留并干净地完成 Microsoft 365 部署。</p>
              <a href="https://setup.office.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#0078d4] hover:underline">前往微软官方激活网 &gt;</a>
            </div>
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">📡</div>
              <h4 className="text-base font-bold mb-2">服务器与 SQL 本地激活 (Volume)</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">解决 Server 激活报错问题，提供官方原生 ISO 下载验证渠道。</p>
              <button onClick={() => showToast("我们的 7x24 小时技术团队已就位，请直接在下方申请获取合规咨询部署。", "ℹ️")} className="text-xs font-semibold text-[#0078d4] hover:underline text-left focus:outline-none">一键联系在线支持专家 &gt;</button>
            </div>
          </div>

          {/* Interactive Collapsible FAQ */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#e8e8ed] p-8">
            <h3 className="text-lg font-bold mb-6 text-center text-[#1d1d1f]">🤔 关于正版软件购买，您的核心焦虑解答</h3>
            
            <div className="space-y-4 divide-y divide-[#f5f5f7]">
              
              <div className="pt-4 first:pt-0">
                <button 
                  onClick={() => toggleFAQ(1)} 
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#0078d4] focus:outline-none transition"
                >
                  <span>Q1：为什么你们的价格比微软官网直接购买便宜这么多？是不是盗版？</span>
                  <span className={`transform transition-transform duration-200 text-xs ${openFaqId === 1 ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaqId === 1 && (
                  <p className="text-xs text-[#86868b] mt-3 leading-relaxed">
                    绝对是正版。我们采购的是微软针对全球不同地区进行大宗协议采购的批量许可证（Volume Licensing）或大客户合作伙伴通道（CSP）。微软官方对大宗采购有极高让利，我们扣除渠道成本后把这些合规红利让渡给开发者与广大个人用户。所以支持绑定微软账号、官方镜像下载，绝非黑产非法 Key。
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => toggleFAQ(2)} 
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#0078d4] focus:outline-none transition"
                >
                  <span>Q2：买完密钥，重装电脑或者更换设备后，还能继续用吗？</span>
                  <span className={`transform transition-transform duration-200 text-xs ${openFaqId === 2 ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaqId === 2 && (
                  <p className="text-xs text-[#86868b] mt-3 leading-relaxed">
                    可以！由于我们所提供的是 Retail 级别的正规密钥，这些激活码将支持在您登录自己的微软账户后实现云关联绑定。重装设备时，只需在微软官方激活面板上点击“我最近更改了此设备的硬件”，便可瞬间实现无损二次激活。
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => toggleFAQ(3)} 
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#0078d4] focus:outline-none transition"
                >
                  <span>Q3：我的企业正面临合规审查，能用这些 Key 通过官方 SAM 审计吗？</span>
                  <span className={`transform transition-transform duration-200 text-xs ${openFaqId === 3 ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaqId === 3 && (
                  <p className="text-xs text-[#86868b] mt-3 leading-relaxed">
                    能！我们特为企业采购用户提供专属批量合规协议通道，并且在发货时提供微软原厂合规声明与我司授权认证收据（支持发票）。若在审计期间发生任何问题，我方合规专家团队将提供一对一法律合规技术支持，全程保驾护航。
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {}
      {/* Deliver & Account Portal Section */}
      <section id="portal" className="py-20 bg-white border-t border-[#e8e8ed]">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase mb-2">Client Fulfillment Center</span>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">微软正版一键式交付中心</h2>
            <p className="text-sm text-[#86868b] mt-2">在这里，您可以方便地管理已经购买的正版授权密钥，一键安全复制，并可直达微软官方下载中心。</p>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl p-6 sm:p-10 border border-[#e8e8ed] shadow-sm">
            <div className="flex flex-col items-center justify-between gap-4 pb-6 mb-8 border-b border-[#e8e8ed] sm:flex-row">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold bg-gray-200 rounded-full border border-gray-300 text-[#1d1d1f]">
                  U
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1d1d1f]">演示采购测试账户 (Demo Account)</h4>
                  <p className="text-xs text-[#86868b]">注册邮箱：trial-buyer@keystarter.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-green-200">
                  ● 账户状态：正常激活
                </span>
              </div>
            </div>

            <h4 className="text-xs font-bold text-[#86868b] uppercase tracking-wider mb-4">您的可用正版授权密钥 (My Genuine Licenses)</h4>
            
            <div className="space-y-4">
              {purchasedLicenses.map((lic) => (
                <div 
                  key={lic.id} 
                  className="v5-card-light bg-white p-5 rounded-2xl border border-[#e8e8ed] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500/30 transition shadow-sm"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mt-1 md:mt-0 ${lic.isOffice ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
                      {lic.isOffice ? <OfficeIcon /> : <WindowsIcon />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-[#1d1d1f]">{lic.title}</span>
                        <span className={`text-[10px] font-semibold px-2 rounded ${lic.isOffice ? 'bg-red-50 text-[#f25022]' : 'bg-blue-50 text-[#0078d4]'}`}>
                          {lic.licenseType}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-0.5 rounded">{lic.key}</span>
                        <button 
                          onClick={() => copyToClipboard(lic.key)} 
                          className="text-blue-500 hover:text-blue-700 text-xs transition focus:outline-none"
                        >
                          一键复制
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    <a 
                      href={lic.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-center bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] px-4 py-2.5 rounded-lg border border-[#d2d2d7] transition whitespace-nowrap"
                    >
                      直达官方原厂下载 &gt;
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Generation controls for Sandbox testing */}
            <div className="mt-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 text-center">
              <h5 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">🎁 互动功能：自主模拟支付与激活流程</h5>
              <p className="text-xs text-blue-700 max-w-lg mx-auto mb-4">
                点击下方按钮可直接模拟购买任意微软激活密钥，成功后系统将自动在上方账户卡片中为您下发新激活密钥，快来试试吧！
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => simulateDirectOrder('Windows 11 Home', false, 'TX9XD-98N7V-6WMQ6-BX7FG-H8Q99')} 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow"
                >
                  模拟下发 Windows 11 Key
                </button>
                <button 
                  onClick={() => simulateDirectOrder('Office 2026 Pro Plus', true, 'T3N7V-8BYX2-6QBMQ-99FGH-73GX9')} 
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow"
                >
                  模拟下发 Office 2026 Key
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* Deep-dark corporate footer */}

      {}
      {/* Checkout side drawer with pure React state binding */}
      {isDrawerOpen && <Portal>
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" onClick={closeCheckoutDrawer}></div>
          
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white border-l border-[#e8e8ed] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out">
              
              {/* Header */}
              <div className="p-6 border-b border-[#e8e8ed]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1d1d1f]">🔒 安全结算与激活交付</h3>
                  <button onClick={closeCheckoutDrawer} className="text-gray-400 hover:text-gray-500 text-lg">×</button>
                </div>
                <p className="text-xs text-[#86868b] mt-1">完成模拟支付后，正版授权将在 5 分钟内下发至交付中心。</p>
              </div>

              {/* Form Content */}
              <form onSubmit={handlePurchase} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="bg-[#f5f5f7] p-4 rounded-xl border border-[#e8e8ed]">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">选购产品：</span>
                  <h4 className="text-base font-bold mt-1 text-[#1d1d1f]">{checkoutProduct.title}</h4>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-bold text-[#0078d4]">${checkoutProduct.price}</span>
                    <span className="text-xs text-green-600">✓ 全球秒发货</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#1d1d1f]">您的接收邮箱（极重要，用于极速交付）：</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="example@gmail.com" 
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" 
                  />
                  <p className="text-[10px] text-gray-400">我们将在此邮箱为您注册自动交付账户，您可在账户随时提取此 Key。</p>
                </div>

                {/* Simulated Payment select */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-[#1d1d1f]">选择安全支付通道：</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      onClick={() => setPayMethod(1)} 
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition ${payMethod === 1 ? 'border-[#0078d4] bg-blue-50/25' : 'border-[#e8e8ed]'}`}
                    >
                      <span className="text-xs font-semibold">PayPal</span>
                      <span className="text-xs text-blue-600">{payMethod === 1 ? '●' : '○'}</span>
                    </div>
                    <div 
                      onClick={() => setPayMethod(2)} 
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition ${payMethod === 2 ? 'border-[#0078d4] bg-blue-50/25' : 'border-[#e8e8ed]'}`}
                    >
                      <span className="text-xs font-semibold">Stripe</span>
                      <span className="text-xs text-gray-600">{payMethod === 2 ? '●' : '○'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-[#e8e8ed] space-y-2">
                  <div className="flex items-center text-[10px] text-[#86868b] gap-2">
                    <span className="text-green-500">✓</span> 支持官方绑定 MSA 账号验证
                  </div>
                  <div className="flex items-center text-[10px] text-[#86868b] gap-2">
                    <span className="text-green-500">✓</span> 7天无理由退款保证 (无激活失败风险)
                  </div>
                  <div className="flex items-center text-[10px] text-[#86868b] gap-2">
                    <span className="text-green-500">✓</span> 256-bit SSL 证书链路加密保护
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-bold py-4 rounded-xl transition flex items-center justify-center space-x-1 shadow-lg shadow-blue-500/10"
                  >
                    <span>💳 模拟完成安全支付</span>
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-2">点击将自动在后台为您下发订单密钥！</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}</Portal>

      {}
      {/* Global Interactive Notification Toast */}
      {toast.visible && <Portal>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1d1d1f] text-white text-xs font-medium px-5 py-3.5 rounded-full shadow-2xl flex items-center space-x-2.5 border border-white/10 transition-all duration-300">
          <span>{toast.icon}</span>
          <span>{toast.message}</span>
        </div>
      )}</Portal>

    </div>
  );
}