// FAQ data
export interface FAQItem { q: string; a: string; }
export const GENERIC_FAQS: FAQItem[] = [
  {q:"How long does delivery take?", a:"Delivery is instant -- your license key is sent via email within 2-5 minutes after payment confirmation."},
  {q:"Is this a genuine license?", a:"Yes. All licenses sold on KeyStarter are 100% genuine. OEM keys are sourced from authorized Microsoft partners."},
  {q:"Will I receive a physical disc or USB?", a:"No physical media is included. You will receive a digital license key via email."},
  {q:"Can I use this on multiple computers?", a:"Each license is for one device only."},
  {q:"Do you offer refunds?", a:"Due to the digital nature of license keys, all sales are final. Contact support@keys-starter.com for activation issues."}
];
export const FAQ_BY_SERIES: Record<string, FAQItem[]> = {
  "win-consumer": [
    {q:"What is the difference between Home and Pro?", a:"Pro includes BitLocker encryption, Remote Desktop, Hyper-V virtualization, Windows Sandbox, and Group Policy management."},
    {q:"Can I upgrade from Home to Pro later?", a:"Yes. You can upgrade at any time via Settings > Activation > Change product key."},
    {q:"Does this include free updates?", a:"Yes. OEM licenses include all security and cumulative updates."},
    {q:"What if I already have Windows installed?", a:"You can simply enter the new product key in Settings > Update & Security > Activation."}
  ],
  "win-official": [
    {q:"What makes the Official version different?", a:"Official versions are sourced directly from Microsoft as retail purchases with order screenshots."},
    {q:"Can I transfer the Official license?", a:"Yes. Official retail licenses can be transferred to a new device."},
    {q:"Does the Official version include Microsoft support?", a:"Yes. Official retail copies include direct Microsoft support eligibility."}
  ],
  "office": [
    {q:"What is the difference between Office 2019 and 2021?", a:"Office 2021 adds improved co-authoring, dynamic arrays in Excel, dark mode, and better performance."},
    {q:"Is this a one-time purchase or a subscription?", a:"This is a one-time purchase (perpetual license) with lifetime activation. No recurring fees."},
    {q:"Can I install on Mac?", a:"No. These versions are for Windows PC only."},
    {q:"What apps are included?", a:"Professional Plus includes Word, Excel, PowerPoint, Outlook, OneNote, Publisher, and Access."}
  ],
  "iot": [
    {q:"What is LTSC?", a:"Long Term Servicing Channel provides 10 years of support with no feature updates -- ideal for medical devices, ATMs, and kiosks."},
    {q:"What is the difference between Entry, Value, and High End?", a:"Entry provides basic IoT lockdown features. Value adds BitLocker encryption. High End includes full Enterprise features."},
    {q:"Can I use this for commercial products?", a:"Yes. Windows IoT Enterprise licenses are designed for commercial embedded and IoT devices."},
    {q:"What is the MultiLanguage version?", a:"MultiLanguage variants support 30+ display languages in a single image for global deployment."}
  ],
  "server": [
    {q:"What is included in a 16-core license?", a:"A 16-core minimum license covers up to 2 physical processors. Additional cores require supplementary licenses."},
    {q:"What is the difference between 2019, 2022, and 2025?", a:"Each release offers improved security and cloud features. 2025 is the latest with AI-powered management."},
    {q:"Can I run this in a virtual machine?", a:"Yes. Windows Server IoT licenses allow running the OS in virtualized environments."}
  ],
  "sql": [
    {q:"What is the Runtime license?", a:"Runtime licenses are designed for IoT and embedded scenarios where SQL Server is bundled with an application."},
    {q:"What is the difference between SQL 2019 and 2022?", a:"SQL 2022 introduces Intelligent Query Processing improvements and Azure-connected features."}
  ]
};
