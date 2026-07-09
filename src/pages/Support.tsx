import { Link } from "react-router-dom";

const topics = [
  {t:"Windows 激活指南",d:"Windows 10/11 Pro 数字授权激活步骤详解"},
  {t:"Office 安装教程",d:"Office 2016-2024 专业增强版安装激活"},
  {t:"服务器配置",d:"Windows Server / SQL / Exchange 部署指南"},
  {t:"套餐激活",d:"多产品套餐包的激活方法"},
  {t:"授权转移",d:"更换设备后如何转移授权"},
  {t:"常见问题",d:"激活错误代码及解决方案汇总"},
];

export default function SupportPage() {
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">技术支持</h1>
        <p className="text-base font-light text-white/80 mb-8">获取激活、安装和授权方面的帮助。</p>
        <div className="max-w-xl mx-auto">
          <input type="text" placeholder="搜索帮助主题..." className="w-full p-3.5 text-sm border-none rounded-xl outline-none text-[#1d1d1f]" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">热门主题</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {topics.map((t,i)=>(
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#e8e8ed] hover:shadow-md transition cursor-pointer">
              <div className="text-sm font-bold mb-2">{t.t}</div>
              <div className="text-xs text-[#86868b]">{t.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border-t border-[#e8e8ed] py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>
            <div className="text-base font-bold">需要更多帮助？</div>
            <div className="text-xs text-[#86868b]">发送邮件至 support@keystarter.com</div>
          </div>
          <Link to="/" className="bg-[#0078d4] hover:bg-[#0062b1] text-white px-6 py-2.5 text-sm font-semibold rounded-xl transition">联系我们</Link>
        </div>
      </div>
    </div>
  );
}
