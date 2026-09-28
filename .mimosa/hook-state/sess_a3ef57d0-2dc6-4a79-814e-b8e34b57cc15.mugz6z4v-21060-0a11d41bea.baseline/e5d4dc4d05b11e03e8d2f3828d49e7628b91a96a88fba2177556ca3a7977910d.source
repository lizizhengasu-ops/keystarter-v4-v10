<section id="store" className="py-20 bg-[#f5f5f7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-4">10 Core Microsoft Licenses</h2>
            <p className="text-sm text-[#86868b]">Filter by category. Genuine delivery guarantee on every card.</p>
        </div>

        
        <div className="flex justify-center mb-10 overflow-x-auto py-2">
            <div className="flex space-x-1.5 bg-white p-1.5 rounded-full border border-[#e8e8ed] shadow-[0_4px_12px_rgba(0,0,0,0.03)] whitespace-nowrap">
                <button onClick="filterSKU('all')" id="tab-all" className="tab-btn px-6 py-2 rounded-full text-xs font-semibold transition bg-[#1d1d1f] text-white">All Products (10)</button>
                <button onClick="filterSKU('windows')" id="tab-windows" className="tab-btn px-6 py-2 rounded-full text-xs font-semibold transition text-[#86868b] hover:text-black">Windows & Server (3)</button>
                <button onClick="filterSKU('office')" id="tab-office" className="tab-btn px-6 py-2 rounded-full text-xs font-semibold transition text-[#86868b] hover:text-black">Office Suite (5)</button>
                <button onClick="filterSKU('server')" id="tab-server" className="tab-btn px-6 py-2 rounded-full text-xs font-semibold transition text-[#86868b] hover:text-black">Enterprise (2)</button>
            </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="sku-container">
            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="windows">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">Retail</span>
                    {filtered.map(p => <V4SkuCard key={p.slug} product={p} onAddToCart={cart.add} />)}</div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                            <i className="fa-brands fa-windows text-2xl text-[#0078d4]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Windows 11 Pro</h3>
                            <p className="text-xs text-[#86868b]">适合高级个人、程序员和企业开发人员</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 100% 绑定个人微软账号 (MSA)</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持设备重装与重置</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 官方原生下载及全功能更新</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$19.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$199.00</span>
                        </div>
                        <span className="text-[11px] text-[#0078d4] font-medium"><i className="fa-regular fa-circle-check"></i> 支持SAM审计</span>
                    </div>
                    <button onClick="openCheckoutDrawer('Windows 11 Pro', 19.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="windows">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">Retail</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                            <i className="fa-brands fa-windows text-2xl text-[#00a4ef]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Windows 11 Home</h3>
                            <p className="text-xs text-[#86868b]">适合家庭及个人日常办公娱乐使用</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持一次激活永久使用</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 无缝自动获取安全更新</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持官方正品防伪验证</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$14.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$139.00</span>
                        </div>
                    </div>
                    <button onClick="openCheckoutDrawer('Windows 11 Home', 14.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="windows">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">Retail</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                            <i className="fa-brands fa-windows text-2xl text-[#7fba00]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Windows 10 Pro</h3>
                            <p className="text-xs text-[#86868b]">针对老款配置电脑深度优化的稳定系统</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 经典稳定系统，支持硬件升级</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 极佳的旧软件与工业软件兼容性</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 一键升级 Windows 11 专业版特权</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$16.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$149.00</span>
                        </div>
                    </div>
                    <button onClick="openCheckoutDrawer('Windows 10 Pro', 16.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="office">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">1年个人订阅</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                            <i className="fa-solid fa-boxes-stacked text-2xl text-[#f25022]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Microsoft 365 个人版</h3>
                            <p className="text-xs text-[#86868b]">包含 1TB OneDrive 极速云盘及所有 Office 组件</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持 5 台设备同时在线登录使用</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 绑定个人微软账户，自动续期激活</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 内含高级版 Word, Excel, PPT, Outlook</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$29.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$69.99</span>
                        </div>
                    </div>
                    <button onClick="openCheckoutDrawer('Microsoft 365 Personal (1 Year)', 29.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="office">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">1年家庭订阅</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                            <i className="fa-solid fa-users text-2xl text-[#f25022]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Microsoft 365 家庭版</h3>
                            <p className="text-xs text-[#86868b]">支持多达 6 位家庭成员独立分配、独享 6TB 空间</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 每个账户独立 1TB 云存储，安全隔离</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持 6 个微软邮箱独立加入绑定</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 每位成员可在 5 台设备同时使用</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$39.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$99.99</span>
                        </div>
                        <span className="text-xs text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">性价比之王</span>
                    </div>
                    <button onClick="openCheckoutDrawer('Microsoft 365 Family (1 Year)', 39.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="office">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">1年商业订阅</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                            <i className="fa-solid fa-building text-2xl text-[#f25022]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">M365 商业标准版</h3>
                            <p className="text-xs text-[#86868b]">专为中小企业合规审计设计的云+本地办公套餐</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持自定义企业邮箱域名 (Exchange)</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 包含 Team、SharePoint 等协同工具</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 提供完整的商业合规授权凭证</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$49.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$150.00</span>
                        </div>
                    </div>
                    <button onClick="openCheckoutDrawer('Microsoft 365 Business Standard (Annual)', 49.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="office">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">永久买断版</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                            <i className="fa-solid fa-file-invoice text-2xl text-orange-500"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Office 2026 专业增强版</h3>
                            <p className="text-xs text-[#86868b]">经典永久买断，一次性购买终身激活使用</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 无需年费，支持重装与硬件检测绑定</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 经典 Access, Publisher 独家完整版</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 企业合规首选，完全规避授权审计</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$34.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$439.00</span>
                        </div>
                    </div>
                    <button onClick="openCheckoutDrawer('Office 2026 Professional Plus (Lifetime)', 34.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="office">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">永久买断版</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                            <i className="fa-solid fa-laptop text-2xl text-orange-400"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Office 2026 家庭学生版</h3>
                            <p className="text-xs text-[#86868b]">专为 Mac 或 PC 用户深度定制的官方版</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 绑定个人 MSA 账号，无封锁危险</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持 Mac 设备与 Windows 双系统</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 经典核心 3 件套，轻量化部署</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$24.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$149.00</span>
                        </div>
                    </div>
                    <button onClick="openCheckoutDrawer('Office 2026 Home & Student (Mac/PC)', 24.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="server">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">Volume 批量版</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100">
                            <i className="fa-solid fa-server text-2xl text-[#8f00ff]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">Win Server 2025 标准版</h3>
                            <p className="text-xs text-[#86868b]">包含 16 Core 授权，针对新一代硬件深度优化</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 支持物理机本地虚拟化与云端服务器部署</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 高级别安全性与多层合规保护机制</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 满足大企业 IT 架构审计要求</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$89.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$1069.00</span>
                        </div>
                    </div>
                    <button onClick="openCheckoutDrawer('Windows Server 2025 Standard (16 Core)', 89.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            
            <div className="sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between" data-category="server">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-200"><i className="fa-solid fa-bolt mr-1"></i> Instant Delivery</span>
                        <span className="text-xs text-[#86868b]">SQL Server</span>
                    </div>
                    <div className="flex items-center space-x-3.5 mb-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100">
                            <i className="fa-solid fa-database text-2xl text-[#8f00ff]"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f]">SQL Server 25 Standard</h3>
                            <p className="text-xs text-[#86868b]">高并发、高性能数据库官方安全授权密钥</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 包含标准 5 CAL 访问授权许可</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 激活状态永久保持有效，全生命期支持</li>
                        <li><i className="fa-solid fa-check text-green-500 mr-2"></i> 原版离线 ISO 物理验证激活</li>
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-2xl font-extrabold text-[#1d1d1f]">$149.99</span>
                            <span className="text-xs text-[#86868b] line-through ml-1">$1899.00</span>
                        </div>
                        <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">企业级首选</span>
                    </div>
                    <button onClick="openCheckoutDrawer('SQL Server 2025 Standard (5 CALs)', 149.99)" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-1">
                        <span>立即购买</span> <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>