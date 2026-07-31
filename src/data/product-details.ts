// Product detail data - descriptions, features, system requirements

export interface ProductDetail {
  desc: string;
  features: string[];
  requirements: { l: string; v: string }[];
}

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {};

PRODUCT_DETAILS['office-2021-pro-plus'] = {
    desc: 'Perpetual Office 2021 Professional Plus for one PC. Includes Word, Excel, PowerPoint, Outlook, OneNote, Publisher, and Access with no subscription fees.',
  tags: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'Publisher + Access', 'No Subscription', '1 PC License'],  features: [
    'Word 2021 with improved co-authoring and dark mode support',
    'Excel 2021 with XLOOKUP, dynamic arrays, and LET function',
    'PowerPoint 2021 with morph transition, 3D models, and recorded presentations',
    'Outlook 2021 with focused inbox, at-mentions, and travel/card views',
    'OneNote 2021 for digital note-taking across devices',
    'Publisher 2021 for professional desktop publishing',
    'Access 2021 for database creation and management',
    'One-time purchase with lifetime license, no subscription needed',
  ],
  requirements: [
    { l: 'OS', v: 'Windows 11, Windows 10, or Windows Server 2019 or newer' },
    { l: 'CPU', v: '1.6 GHz or faster, 2+ cores recommended' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '4 GB available disk space minimum' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Display', v: '1280x768 resolution minimum' },
    { l: 'Internet', v: 'Internet required for installation and activation' },
    { l: 'Browser', v: 'Current version of Edge, Chrome, or Firefox' },
  ],
};

PRODUCT_DETAILS['sql-svr-2022-runtime'] = {
    desc: 'SQL Server 2022 Standard Runtime for IoT. Enterprise-grade database for embedded and edge environments with full-text search, high availability, and intelligent query processing.',
  tags: ['SQL Server 2022', 'IoT Runtime', 'Always On AG', 'LEDGER Tables', 'Full-Text Search', 'Data Classification'],  features: [
    'Full SQL Server 2022 Standard database engine',
    'Native XML support and Full-Text Search capabilities',
    'SQL Server Integration Services for ETL processes',
    'SQL Server Reporting Services for business reporting',
    'Always On availability groups for high availability',
    'Built-in data classification and auditing',
    'Intelligent Query Processing for performance optimization',
    'IoT-optimized runtime with reduced storage footprint',
  ],
  requirements: [
    { l: 'CPU', v: '1.4 GHz 64-bit processor minimum, 2+ GHz recommended' },
    { l: 'RAM', v: '1 GB minimum, 4 GB recommended (increase with database size)' },
    { l: 'Storage', v: '6 GB available disk space minimum' },
    { l: 'Monitor', v: 'Super-VGA (800x600) or higher' },
    { l: 'OS', v: 'Windows 10 1607+, Windows Server 2016+, or Windows IoT editions' },
    { l: '.NET', v: '.NET Framework 4.7.2 or later required' },
    { l: 'Network', v: '1 Gbps Ethernet adapter recommended' },
  ],
};

PRODUCT_DETAILS['win-svr-iot-2022'] = {
    desc: 'Windows Server IoT 2022 Standard 16-core license for embedded and industrial servers. Secured-core security, Azure Arc hybrid management, and software-defined storage.',
  tags: ['Secured-core', 'Azure Arc', 'Storage Spaces Direct', 'Storage Replica', '16-Core License', 'Containers'],  features: [
    'Secured-core server with advanced threat protection',
    'Trusted launch for virtualization-based security',
    'Azure Arc hybrid management and governance',
    'Storage Spaces Direct for software-defined storage',
    'Storage Replica for disaster recovery',
    'Containers support with Linux and Windows containers',
    'Software Defined Networking for network virtualization',
    '16-core license covering up to 2 physical processors',
  ],
  requirements: [
    { l: 'CPU', v: '1.4 GHz 64-bit processor, 16 core minimum for this SKU' },
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 60 GB recommended' },
    { l: 'Network', v: '1 Gbps Ethernet adapter' },
    { l: 'Display', v: 'SVGA (1024x768) or higher' },
    { l: 'Firmware', v: 'UEFI 2.3.1c with Secure Boot' },
    { l: 'TPM', v: 'TPM 2.0 recommended' },
    { l: 'Hyper-V', v: 'SLAT-capable hardware for virtualization roles' },
  ],
};

PRODUCT_DETAILS['windows-10-pro'] = {
    desc: 'Windows 10 Pro OEM key for advanced productivity. Includes BitLocker, Remote Desktop, Hyper-V, and Group Policy with lifetime activation.',
  tags: ['BitLocker', 'Remote Desktop', 'Hyper-V', 'Group Policy', 'WIP', 'Lifetime OEM'],  features: [
    'BitLocker device encryption for comprehensive data security',
    'Remote Desktop for remote access to your workspace',
    'Hyper-V for virtualization and app compatibility testing',
    'Group Policy management for enterprise-level configuration',
    'Windows Information Protection to prevent data leaks',
    'Assigned Access for dedicated device configurations',
    'Enterprise Mode Internet Explorer for legacy app support',
    'Long Term Servicing Channel options available',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '2 GB minimum (64-bit), 4 GB recommended' },
    { l: 'Storage', v: '20 GB minimum (64-bit), 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics with WDDM 1.0 driver' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI or Legacy BIOS supported' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'Internet', v: 'Internet connection required for updates and activation' },
  ],
};

PRODUCT_DETAILS['windows-11-home'] = {
    desc: 'Windows 11 Home OEM key for everyday use. Snap Layouts, Microsoft Teams, Widgets, DirectX 12 Ultimate, and Windows Hello included with lifetime activation.',
  tags: ['Snap Layouts', 'Microsoft Teams', 'Widgets', 'DirectX 12 Ultimate', 'Windows Hello', 'Lifetime OEM'],  features: [
    'Redesigned Start menu with recommended content',
    'Snap Layouts and Snap Groups for efficient multitasking',
    'Microsoft Teams integration directly from taskbar',
    'Widgets for personalized news, weather, and calendar',
    'DirectX 12 Ultimate for cutting-edge gaming performance',
    'Auto HDR for improved gaming visuals',
    'Android app support via Amazon Appstore',
    'Windows Hello biometric security with fingerprint/face',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 2+ cores, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for updates; Microsoft account for personal use' },
  ],
};

PRODUCT_DETAILS['windows-11-pro'] = {
    desc: 'Windows 11 Pro OEM key for business and power users. Adds BitLocker, Remote Desktop, Hyper-V, Windows Sandbox, and Group Policy on top of Windows 11 Home.',
  tags: ['BitLocker', 'Remote Desktop', 'Hyper-V', 'Windows Sandbox', 'Group Policy', 'Lifetime OEM'],  features: [
    'BitLocker device encryption for complete data protection',
    'Remote Desktop for secure remote access to your PC',
    'Hyper-V for running virtual machines and testing environments',
    'Windows Sandbox for safe application testing in isolated containers',
    'Group Policy Management for centralized IT control',
    'Assigned Access for dedicated kiosk and single-app configurations',
    'Windows Information Protection for enterprise data security',
    'Microsoft Remote Desktop Services for multi-user scenarios',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 2+ cores, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'Trusted Platform Module 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot capability' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p display, 8+ bit color depth, 9+ inch diagonal' },
    { l: 'Internet', v: 'Required for updates; Microsoft account for personal use' },
    { l: 'MS Account', v: 'Microsoft account required for personal use features' },
  ],
};
PRODUCT_DETAILS['office-2019-pro-plus'] = {
    desc: 'Perpetual Office 2019 Professional Plus for one PC. Includes Word, Excel, PowerPoint, Outlook, OneNote, Publisher, and Access with no recurring fees.',
  tags: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'Publisher + Access', 'No Subscription', '1 PC License'],  features: [
    'Word 2019 with improved focus mode and learning tools',
    'Excel 2019 with new formulas and data analysis features',
    'PowerPoint 2019 with Morph transition and SVG support',
    'Outlook 2019 with focused inbox and travel tracking',
    'OneNote 2019 for cross-device note-taking',
    'Publisher 2019 for professional layout and design',
    'Access 2019 for desktop database management',
    'One-time purchase with lifetime license for 1 PC',
  ],
  requirements: [
    { l: 'OS', v: 'Windows 10, Windows Server 2019' },
    { l: 'CPU', v: '1.6 GHz or faster, 2 cores recommended' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '4 GB available disk space' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Display', v: '1280x768 resolution minimum' },
    { l: 'Internet', v: 'Required for installation and activation' },
  ],
};

PRODUCT_DETAILS['sql-svr-2019-runtime'] = {
    desc: 'SQL Server 2019 Standard Runtime for IoT. Reliable relational database with Big Data Clusters, intelligent query processing, and built-in machine learning for edge devices.',
  tags: ['SQL Server 2019', 'IoT Runtime', 'Big Data Clusters', 'Always On AG', 'Machine Learning', 'Full-Text Search'],  features: [
    'SQL Server 2019 Standard database engine',
    'Big Data Clusters for data virtualization',
    'Intelligent Query Processing for workload optimization',
    'Always On availability groups for high availability',
    'Row-level security and dynamic data masking',
    'SQL Server Integration Services for data integration',
    'Full-text search and native XML support',
    'Built-in machine learning with R and Python support',
  ],
  requirements: [
    { l: 'CPU', v: '1.4 GHz 64-bit, 2+ GHz recommended' },
    { l: 'RAM', v: '1 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '6 GB available disk space' },
    { l: 'OS', v: 'Windows Server IoT 2019/2022 or Windows IoT' },
    { l: '.NET', v: '.NET Framework 4.6.2 or later required' },
    { l: 'Monitor', v: 'Super-VGA (800x600) or higher' },
    { l: 'Network', v: '1 Gbps Ethernet recommended' },
  ],
};

PRODUCT_DETAILS['win-11-iot-2024-entry'] = {
    desc: 'Windows 11 IoT Enterprise LTSC 2024 Entry for fixed-purpose devices. 10-year support lifecycle with no feature updates for maximum production stability.',
  tags: ['LTSC 2024', '10-Year Support', 'Entry Tier', 'Unified Write Filter', 'Kiosk Mode', 'No Feature Updates'],  features: [
    'Long Term Servicing Channel with 10-year support lifecycle',
    'No feature updates for maximum production stability',
    'Windows 11 security features and modern management',
    'Embedded Lockdown capabilities for dedicated devices',
    'Unified Write Filter for write protection',
    'Keyboard Filter for input restriction',
    'Assigned Access for single-app kiosk mode',
    'Enterprise-grade device management via MDM',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot required' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-2024-value'] = {
    desc: 'Windows 11 IoT Enterprise LTSC 2024 Value for retail POS, medical monitors, and industrial HMIs. 10-year LTSC support with BitLocker and enterprise management.',
  tags: ['LTSC 2024', '10-Year Support', 'BitLocker', 'UWF', 'Assigned Access', 'WSUS/MDM'],  features: [
    '10-year Long Term Servicing Channel support',
    'Windows 11 security and management features',
    'Embedded Lockdown and device restriction capabilities',
    'BitLocker drive encryption for data at rest',
    'Windows Defender Antivirus and firewall',
    'Unified Write Filter for storage protection',
    'Assigned Access for dedicated device configurations',
    'Enterprise-grade update control via WSUS',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot required' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-svr-iot-2025'] = {
    desc: 'Windows Server IoT 2025 Standard 16-core license. Latest server OS for industrial servers and edge gateways with AI-powered management and hybrid cloud capabilities.',
  tags: ['Secured-core', 'Azure Arc', 'Storage Spaces Direct', 'AI Management', '16-Core License', 'Containers'],  features: [
    'Secured-core with advanced threat detection and response',
    'Azure Arc integrated hybrid management and governance',
    'Storage Spaces Direct for resilient software-defined storage',
    'Storage Replica for business continuity and disaster recovery',
    'Containers with Linux and Windows support',
    'Software Defined Networking for flexible network virtualization',
    'Active Directory Domain Services for identity management',
    '16-core license ideal for production server workloads',
  ],
  requirements: [
    { l: 'CPU', v: '1.4 GHz 64-bit, 16 core minimum' },
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 60 GB recommended' },
    { l: 'Network', v: '1 Gbps Ethernet adapter' },
    { l: 'Display', v: 'SVGA (1024x768) or higher' },
    { l: 'Firmware', v: 'UEFI 2.3.1c with Secure Boot support' },
  ],
};

PRODUCT_DETAILS['windows-10-home'] = {
    desc: 'Windows 10 Home OEM key for everyday computing. Familiar Start menu, Windows Hello, Microsoft Edge, and DirectX 12 with lifetime activation.',
  tags: ['Start Menu', 'Windows Hello', 'Microsoft Edge', 'DirectX 12', 'Cortana', 'Lifetime OEM'],  features: [
    'Familiar Start menu with Live Tiles',
    'Cortana digital assistant for productivity',
    'Microsoft Edge browser with built-in tracking prevention',
    'Windows Hello for fingerprint and face login',
    'Task View for virtual desktop management',
    'DirectX 12 support for gaming',
    'Windows Defender built-in antivirus protection',
    'Parental Controls with Microsoft Family features',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '1 GB minimum (32-bit) / 2 GB minimum (64-bit), 4 GB recommended' },
    { l: 'Storage', v: '16 GB minimum (32-bit) / 20 GB minimum (64-bit), 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Firmware', v: 'UEFI with Secure Boot capability' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};

PRODUCT_DETAILS['windows-11-home-official'] = {
    desc: 'Official Windows 11 Home OEM order with Microsoft order screenshot included. Snap Layouts, Teams, Widgets, and DirectX 12 Ultimate for daily use.',
  tags: ['Official Microsoft Order', 'Screenshot Proof', 'Snap Layouts', 'DirectX 12 Ultimate', 'Windows Hello', 'Lifetime License'],  features: [
    'Official Microsoft order with screenshot proof',
    'Snap Layouts and Snap Groups for multitasking',
    'Microsoft Teams integration from taskbar',
    'Widgets for personalized news and updates',
    'DirectX 12 Ultimate for advanced gaming',
    'Auto HDR for enhanced gaming visuals',
    'Windows Hello biometric security',
    'Android app support via Amazon Appstore',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 2+ cores, 64-bit' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for updates; Microsoft account for personal use' },
  ],
};

PRODUCT_DETAILS['windows-11-pro-official'] = {
    desc: 'Official Windows 11 Pro OEM order with Microsoft order screenshot. Adds BitLocker, Remote Desktop, Hyper-V, Windows Sandbox, and Group Policy for business use.',
  tags: ['Official Microsoft Order', 'Screenshot Proof', 'BitLocker', 'Remote Desktop', 'Hyper-V', 'Windows Sandbox'],  features: [
    'Official Microsoft direct order with order screenshot',
    'BitLocker encryption for data protection',
    'Remote Desktop for remote access',
    'Hyper-V for virtualization',
    'Windows Sandbox for safe testing',
    'Group Policy Management for IT control',
    'Windows Information Protection',
    'Full Microsoft support eligibility',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 2+ cores, 64-bit' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p display, 9+ inch diagonal' },
    { l: 'Internet', v: 'Required for updates; Microsoft account for personal use' },
  ],
};
PRODUCT_DETAILS['win-10-iot-2019-entry'] = {
    desc: 'Windows 10 IoT Enterprise LTSC 2019 Entry for basic embedded devices. 10-year support, Embedded Lockdown, and kiosk mode for fixed-purpose systems.',
  tags: ['LTSC 2019', '10-Year Support', 'Entry Tier', 'Unified Write Filter', 'Kiosk Mode', 'No Feature Updates'],  features: [
    'Entry-level IoT tier for basic embedded devices',
    '10-year Long Term Servicing Channel support lifecycle',
    'Embedded Lockdown capabilities for dedicated devices',
    'Unified Write Filter for storage write protection',
    'Keyboard Filter for input device restriction',
    'Assigned Access for single-application kiosk mode',
    'Windows Defender built-in antivirus protection',
    'Enterprise-grade update control via WSUS/SCCM',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI recommended' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2019-high-end'] = {
    desc: 'Windows 10 IoT Enterprise LTSC 2019 High End for mission-critical systems. Full Enterprise feature set, advanced security, and 10-year LTSC support.',
  tags: ['LTSC 2019', '10-Year Support', 'Device Guard', 'AppLocker', 'BitLocker', 'High End Tier'],  features: [
    'Premium IoT tier with complete Enterprise feature set',
    '10-year Long Term Servicing Channel support lifecycle',
    'Device Guard and Credential Guard advanced security',
    'AppLocker application control policies',
    'BranchCache for WAN bandwidth optimization',
    'DirectAccess for seamless remote connectivity',
    'Microsoft UE-V for user settings roaming',
    'Full BitLocker and Windows Information Protection',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended' },
    { l: 'TPM', v: 'TPM 2.0 recommended' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2019-value'] = {
    desc: 'Windows 10 IoT Enterprise LTSC 2019 Value for retail POS and industrial HMIs. Mid-tier IoT features with BitLocker, UWF, and enterprise management.',
  tags: ['LTSC 2019', '10-Year Support', 'BitLocker', 'Unified Write Filter', 'Kiosk Mode', 'Value Tier'],  features: [
    'Mid-range IoT tier with enhanced lockdown features',
    '10-year Long Term Servicing Channel support lifecycle',
    'BitLocker drive encryption for data protection',
    'Unified Write Filter for storage protection',
    'Keyboard Filter for device input restriction',
    'Assigned Access for single/kiosk app mode',
    'Windows Defender Antivirus and firewall',
    'Enterprise management via MDM and Group Policy',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI recommended' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2021-entry'] = {
    desc: 'Windows 10 IoT Enterprise LTSC 2021 Entry for basic embedded devices. 10-year support, Embedded Lockdown, and kiosk mode for fixed-purpose systems.',
  tags: ['LTSC 2021', '10-Year Support', 'Entry Tier', 'Unified Write Filter', 'Kiosk Mode', 'No Feature Updates'],  features: [
    'Entry-level IoT tier for basic embedded devices',
    '10-year Long Term Servicing Channel support lifecycle',
    'Embedded Lockdown capabilities for dedicated devices',
    'Unified Write Filter for storage write protection',
    'Keyboard Filter for input device restriction',
    'Assigned Access for single-application kiosk mode',
    'Windows Defender built-in antivirus protection',
    'Enterprise-grade update control via WSUS/SCCM',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI recommended' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2021-high-end'] = {
    desc: 'Windows 10 IoT Enterprise LTSC 2021 High End for mission-critical systems. Full Enterprise feature set, Device Guard, AppLocker, and 10-year LTSC support.',
  tags: ['LTSC 2021', '10-Year Support', 'Device Guard', 'AppLocker', 'BitLocker', 'High End Tier'],  features: [
    'Premium IoT tier with full Enterprise feature set',
    '10-year Long Term Servicing Channel support lifecycle',
    'Advanced security with Device Guard and Credential Guard',
    'AppLocker and Windows Defender Application Control',
    'BranchCache for distributed office optimization',
    'DirectAccess for seamless VPN connectivity',
    'Microsoft UE-V for user experience roaming',
    'Full BitLocker and Windows Information Protection',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended' },
    { l: 'TPM', v: 'TPM 2.0 recommended' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2021-value'] = {
    desc: 'Windows 10 IoT Enterprise LTSC 2021 Value for retail POS and industrial HMIs. Mid-tier IoT features with BitLocker, UWF, and enterprise management.',
  tags: ['LTSC 2021', '10-Year Support', 'BitLocker', 'Unified Write Filter', 'Kiosk Mode', 'Value Tier'],  features: [
    'Mid-range IoT tier with enhanced lockdown features',
    '10-year Long Term Servicing Channel support lifecycle',
    'BitLocker drive encryption for data protection',
    'Unified Write Filter for storage protection',
    'Keyboard Filter for device input restriction',
    'Assigned Access for single/kiosk app mode',
    'Windows Defender Antivirus and firewall',
    'Enterprise management via MDM and Group Policy',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI recommended' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-2024-high-end'] = {
    desc: 'Windows 11 IoT Enterprise LTSC 2024 High End for advanced industrial automation and medical imaging. Full Enterprise features with 10-year LTSC support.',
  tags: ['LTSC 2024', '10-Year Support', 'Device Guard', 'AppLocker', 'BitLocker', 'High End Tier'],  features: [
    'Premium IoT tier with full Windows 11 Enterprise features',
    '10-year Long Term Servicing Channel support lifecycle',
    'Advanced Device Guard and Credential Guard security',
    'AppLocker and Windows Defender Application Control',
    'BranchCache for distributed office optimization',
    'DirectAccess for seamless VPN connectivity',
    'Microsoft UE-V for user experience virtualization',
    'Full BitLocker and Windows Information Protection',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot required' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-ml-entry'] = {
    desc: 'Windows 11 IoT Enterprise LTSC 2024 MultiLanguage Entry. One image supporting 30+ languages for global IoT and OEM deployments.',
  tags: ['MultiLanguage', '30+ Languages', 'LTSC 2024', '10-Year Support', 'Entry Tier', 'Kiosk Mode'],  features: [
    'Multi-language IoT Entry tier supporting 30+ display languages',
    'Single image deployment for global multi-market distribution',
    '10-year Long Term Servicing Channel support lifecycle',
    'Per-user language switching without reinstallation',
    'Multi-language user interface and input methods',
    'Embedded Lockdown for dedicated device configuration',
    'Entry-level IoT Enterprise feature set',
    'Language-neutral deployment via configuration manager',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-ml-high-end'] = {
    desc: 'Windows 11 IoT Enterprise LTSC 2024 MultiLanguage High End. Full Enterprise features with 30+ display languages for global deployments.',
  tags: ['MultiLanguage', '30+ Languages', 'LTSC 2024', '10-Year Support', 'High End Tier', 'Device Guard'],  features: [
    'Multi-language IoT High End tier supporting 30+ display languages',
    'Single image deployment for global multi-market distribution',
    '10-year Long Term Servicing Channel support lifecycle',
    'Per-user language switching without reinstallation',
    'Multi-language user interface and input methods',
    'Embedded Lockdown for dedicated device configuration',
    'High End-level IoT Enterprise feature set',
    'Language-neutral deployment via configuration manager',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-ml-value'] = {
    desc: 'Windows 11 IoT Enterprise LTSC 2024 MultiLanguage Value. 30+ display languages with BitLocker and enterprise management for multi-region devices.',
  tags: ['MultiLanguage', '30+ Languages', 'LTSC 2024', '10-Year Support', 'BitLocker', 'Value Tier'],  features: [
    'Multi-language IoT Value tier supporting 30+ display languages',
    'Single image deployment for global multi-market distribution',
    '10-year Long Term Servicing Channel support lifecycle',
    'Per-user language switching without reinstallation',
    'Multi-language user interface and input methods',
    'Embedded Lockdown for dedicated device configuration',
    'Value-level IoT Enterprise feature set',
    'Language-neutral deployment via configuration manager',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '4 GB minimum, 8 GB recommended' },
    { l: 'Storage', v: '64 GB minimum, 128 GB recommended (SSD preferred)' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible / WDDM 2.0' },
    { l: 'Display', v: '720p (HD) display, 9+ inch, 8-bit color' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-svr-iot-2019'] = {
    desc: 'Windows Server IoT 2019 Standard 16-core license for embedded deployments needing long-term stability. Azure hybrid services and software-defined storage included.',
  tags: ['Server 2019', '16-Core License', 'Azure Hybrid', 'Storage Spaces Direct', 'Storage Replica', 'Shielded VMs'],  features: [
    'Windows Server 2019 core with IoT-optimized deployment',
    'Azure hybrid services integration and management',
    'Storage Spaces Direct for software-defined storage',
    'Storage Replica for disaster recovery protection',
    'Containers support with Windows Server containers',
    'Software Defined Networking capabilities',
    'Shielded Virtual Machines for enhanced VM security',
    '16-core license for production server workloads',
  ],
  requirements: [
    { l: 'CPU', v: '1.4 GHz 64-bit processor, 16 core minimum' },
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 60 GB recommended' },
    { l: 'Network', v: '1 Gbps Ethernet adapter' },
    { l: 'Display', v: 'SVGA (1024x768) or higher' },
    { l: 'Firmware', v: 'UEFI 2.3.1c with Secure Boot support' },
    { l: 'TPM', v: 'TPM 2.0 recommended for advanced features' },
  ],
};

PRODUCT_DETAILS['windows-10-home-official'] = {
    desc: 'Official Windows 10 Home OEM order with Microsoft order screenshot. Familiar Start menu, Windows Hello, Edge, and DirectX 12 with lifetime activation.',
  tags: ['Official Microsoft Order', 'Screenshot Proof', 'Start Menu', 'Windows Hello', 'DirectX 12', 'Lifetime OEM'],  features: [
    'Official Microsoft order with screenshot proof of purchase',
    'Familiar Start menu with Live Tiles for quick access',
    'Cortana digital assistant for voice commands',
    'Microsoft Edge browser with tracking prevention',
    'Windows Hello for fingerprint and facial recognition',
    'Task View for virtual desktop management',
    'DirectX 12 support for gaming compatibility',
    'Windows Defender antivirus built-in protection',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '1 GB minimum (32-bit) / 2 GB minimum (64-bit), 4 GB recommended' },
    { l: 'Storage', v: '16 GB minimum (32-bit) / 20 GB minimum (64-bit), 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Firmware', v: 'UEFI with Secure Boot capability' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};

PRODUCT_DETAILS['windows-10-pro-official'] = {
    desc: 'Official Windows 10 Pro OEM order with Microsoft order screenshot. BitLocker, Remote Desktop, Hyper-V, and Group Policy for business and professionals.',
  tags: ['Official Microsoft Order', 'Screenshot Proof', 'BitLocker', 'Remote Desktop', 'Hyper-V', 'Group Policy'],  features: [
    'Official Microsoft direct order with screenshot proof of purchase',
    'BitLocker device encryption for data security',
    'Remote Desktop for remote access to your workspace',
    'Hyper-V for running virtual machines',
    'Group Policy management for enterprise configuration',
    'Windows Information Protection for data leak prevention',
    'Assigned Access for kiosk mode configuration',
    'Microsoft support eligibility with order documentation',
  ],
  requirements: [
    { l: 'CPU', v: '1 GHz or faster, 64-bit compatible processor' },
    { l: 'RAM', v: '2 GB minimum (64-bit), 4 GB recommended' },
    { l: 'Storage', v: '20 GB minimum (64-bit), 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI or Legacy BIOS supported' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};
