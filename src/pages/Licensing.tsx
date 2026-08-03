import { useTranslation } from "react-i18next";

export default function LegalPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Licensing Terms</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">License types, activation, and usage rights for Microsoft products.</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <p className="mb-6 text-[11px] text-[#86868b]">Last updated: August 3, 2026</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. Overview</h2>
            <p className="mb-4">This page explains the license types offered by KeyStarter and the rights and restrictions that apply to each. All Microsoft products are subject to the applicable Microsoft End User License Agreement (EULA) and product terms.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. OEM Licenses</h2>
            <p className="mb-4">OEM (Original Equipment Manufacturer) licenses are tied to the first device on which they are activated and may not be transferred to another device. OEM keys are intended for pre-installation on new hardware.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. Retail Licenses</h2>
            <p className="mb-4">Retail licenses, including Full Packaged Product (FPP), can be transferred to another device, subject to Microsoft terms. Retail keys may be reinstalled on the same device as many times as needed.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. Volume Licensing</h2>
            <p className="mb-4">Volume Licensing agreements are intended for organizations and provide centralized management, deployment, and compliance benefits. Volume licenses are subject to the terms of the applicable Volume Licensing agreement.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. IoT Enterprise Licenses</h2>
            <p className="mb-4">IoT Enterprise licenses are designed for dedicated, single-purpose devices such as kiosks, medical devices, ATMs, and industrial controllers. These licenses are device-bound and are not intended for general-purpose computing devices.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. Activation</h2>
            <p className="mb-4">Most products require activation during or after installation. You must have an internet connection to activate the product. Some IoT and Volume licenses may require alternative activation methods.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">7. Usage Rights</h2>
            <p className="mb-4">License usage rights, including the number of permitted devices and users, are defined by the product edition and the applicable Microsoft product terms. It is your responsibility to ensure that your usage complies with these terms.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">8. Compliance and Audits</h2>
            <p className="mb-4">Microsoft may conduct compliance audits of volume license usage. You are responsible for maintaining accurate records of your licensed devices and usage.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">9. Contact</h2>
            <p className="mb-4">For licensing questions, contact us at admin@keystarter.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}