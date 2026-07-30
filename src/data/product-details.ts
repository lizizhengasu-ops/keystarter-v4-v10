// Product detail data - descriptions, features, system requirements

export interface ProductDetail {
  desc: string;
  features: string[];
  requirements: { l: string; v: string }[];
}

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {};

PRODUCT_DETAILS['office-2021-pro-plus'] = {
  desc: 'Office 2021 Professional Plus is the latest perpetual (non-subscription) version of Microsoft flagship productivity suite. Includes Word, Excel, PowerPoint, Outlook, OneNote, Publisher, and Access. One-time purchase with lifetime license for one device. Unlike Microsoft 365, there are no recurring fees. Ideal for businesses and professionals who prefer traditional licensing with a single upfront payment.',
  features: [
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
  desc: 'SQL Server 2022 Standard Runtime for IoT is a full-featured relational database engine designed for IoT and embedded environments. Provides SQL Server 2022 Standard capabilities including native XML support, full-text search, and business intelligence features. Ideal for data-intensive IoT applications, edge analytics, and embedded database scenarios requiring enterprise-grade reliability.',
  features: [
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
    { l: 'RAM', v: '1 GB minimum, 4 GB recommended for Standard Edition' },
    { l: 'Storage', v: '6 GB available disk space minimum' },
    { l: 'OS', v: 'Windows Server IoT 2019/2022 or Windows 10/11 IoT' },
    { l: '.NET', v: '.NET Framework 4.7.2 or later required' },
    { l: 'Network', v: '1 Gbps Ethernet adapter recommended' },
  ],
};

PRODUCT_DETAILS['win-svr-iot-2022'] = {
  desc: 'Windows Server IoT 2022 Standard is a robust server OS designed for embedded and IoT scenarios. Built on Windows Server 2022 core, it delivers advanced multi-layer security, hybrid capabilities with Azure, and a flexible application platform. This 16-core license is ideal for industrial servers, edge computing, and dedicated appliance scenarios where reliability and long-term stability are critical.',
  features: [
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
    { l: 'RAM', v: '512 MB minimum, 2 GB recommended for Server with Desktop' },
    { l: 'Storage', v: '32 GB minimum, 60 GB recommended' },
    { l: 'Network', v: '1 Gbps Ethernet adapter' },
    { l: 'Firmware', v: 'UEFI 2.3.1c with Secure Boot' },
    { l: 'TPM', v: 'TPM 2.0 recommended' },
    { l: 'Hyper-V', v: 'SLAT-capable hardware for virtualization roles' },
  ],
};

PRODUCT_DETAILS['windows-10-pro'] = {
  desc: 'Windows 10 Pro is a mature and proven operating system for users who need advanced functionality beyond the Home edition. This OEM key provides lifetime activation with BitLocker encryption, Remote Desktop, and Hyper-V virtualization. Windows 10 Pro offers broader hardware compatibility than Windows 11, making it the ideal choice for older systems and enterprise environments requiring tested stability.',
  features: [
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
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics with WDDM 1.0 driver' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI or Legacy BIOS supported' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'Internet', v: 'Internet connection required for updates and activation' },
  ],
};

PRODUCT_DETAILS['windows-11-home'] = {
  desc: 'Windows 11 Home is the standard edition designed for everyday home use. Features include a redesigned Start menu, Snap Layouts for multitasking, Microsoft Teams integration, and Widgets for personalized news. This OEM key provides lifetime activation. Supports all Windows 11 consumer features including DirectX 12 Ultimate for gaming, Auto HDR, and Android app support via Amazon Appstore.',
  features: [
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
    { l: 'RAM', v: '4 GB minimum' },
    { l: 'Storage', v: '64 GB minimum' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible graphics / WDDM 2.x' },
    { l: 'Display', v: '720p display, 9+ inch diagonal' },
    { l: 'Internet', v: 'Internet required for updates and certain features' },
  ],
};

PRODUCT_DETAILS['windows-11-pro'] = {
  desc: 'Windows 11 Pro is the professional-grade operating system designed for modern PCs and business environments. This OEM key provides lifetime activation for one device, delivering advanced security, productivity, and management features. Includes BitLocker encryption, Remote Desktop, Hyper-V virtualization, Windows Sandbox, and Group Policy management. Ideal for power users, IT professionals, and small businesses requiring enterprise-level capabilities.',
  features: [
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
    { l: 'GPU', v: 'DirectX 12 compatible graphics, WDDM 2.x driver' },
    { l: 'Display', v: '720p display, 8+ bit color depth, 9+ inch diagonal' },
    { l: 'Internet', v: 'Internet connection required for updates and activation' },
    { l: 'MS Account', v: 'Microsoft account required for personal use features' },
  ],
};
PRODUCT_DETAILS['office-2019-pro-plus'] = {
  desc: 'Office 2019 Professional Plus is a one-time purchase version of Microsoft classic productivity suite. Includes Word, Excel, PowerPoint, Outlook, OneNote, Publisher, and Access. Unlike subscription-based Office 365, this version requires no recurring payments. Ideal for users who prefer traditional licensing and do not need cloud features or ongoing updates.',
  features: [
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
    { l: 'RAM', v: '4 GB minimum' },
    { l: 'Storage', v: '4 GB available disk space' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Display', v: '1280x768 resolution minimum' },
    { l: 'Internet', v: 'Required for installation and activation' },
  ],
};

PRODUCT_DETAILS['sql-svr-2019-runtime'] = {
  desc: 'SQL Server 2019 Standard Runtime for IoT provides enterprise-grade database capabilities for embedded and edge computing environments. SQL Server 2019 introduces big data clusters, intelligent query processing, and enhanced security features. This runtime license is optimized for IoT and embedded deployments requiring a robust and reliable database engine.',
  features: [
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
    { l: 'Network', v: '1 Gbps Ethernet recommended' },
  ],
};

PRODUCT_DETAILS['win-11-iot-2024-entry'] = {
  desc: 'Windows 11 IoT Enterprise LTSC 2024 Entry is a purpose-built operating system for embedded and IoT devices requiring long-term stability. LTSC (Long Term Servicing Channel) provides 10 years of support with no feature updates that could disrupt production systems. Ideal for medical devices, ATMs, industrial controllers, and dedicated kiosk systems.',
  features: [
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
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum' },
    { l: 'TPM', v: 'TPM 2.0 recommended' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-2024-value'] = {
  desc: 'Windows 11 IoT Enterprise LTSC 2024 Value provides core IoT operating system capabilities at a mid-tier price point. Designed for embedded devices that require Windows 11 features but do not need the full high-end feature set. Includes Long Term Servicing Channel for 10-year support lifecycle, ensuring production stability for medical, industrial, and retail devices.',
  features: [
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
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum' },
    { l: 'TPM', v: 'TPM 2.0 recommended' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-svr-iot-2025'] = {
  desc: 'Windows Server IoT 2025 Standard is the latest server operating system for IoT and embedded scenarios. Built on Windows Server 2025 foundations, it delivers cutting-edge security, AI-powered management, and hybrid cloud capabilities. This 16-core license powers industrial servers, edge gateways, and mission-critical appliances requiring enterprise reliability.',
  features: [
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
    { l: 'RAM', v: '512 MB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 60 GB recommended' },
    { l: 'Network', v: '1 Gbps Ethernet adapter' },
    { l: 'Firmware', v: 'UEFI 2.3.1c with Secure Boot support' },
  ],
};

PRODUCT_DETAILS['windows-10-home'] = {
  desc: 'Windows 10 Home is the consumer-focused edition of Microsoft most widely adopted operating system. Features include the familiar Start menu, Cortana digital assistant, Microsoft Edge browser, and Windows Hello security. Windows 10 offers broader hardware compatibility than Windows 11. This OEM key provides lifetime activation for one device.',
  features: [
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
    { l: 'RAM', v: '1 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};

PRODUCT_DETAILS['windows-11-home-official'] = {
  desc: 'Windows 11 Home OEM Official provides the standard Windows 11 experience with official Microsoft order documentation. Includes Snap Layouts, Microsoft Teams integration, Widgets, and DirectX 12 Ultimate gaming support. Each purchase includes an official Microsoft order screenshot as proof of authenticity.',
  features: [
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
    { l: 'RAM', v: '4 GB minimum' },
    { l: 'Storage', v: '64 GB minimum' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible graphics' },
    { l: 'Display', v: '720p display, 9+ inch' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};

PRODUCT_DETAILS['windows-11-pro-official'] = {
  desc: 'Windows 11 Pro OEM Official is a genuine Microsoft direct order product. This is an official Microsoft order with screenshot proof of delivery. Unlike standard OEM keys, this version comes with official Microsoft order documentation, making it ideal for users who need proof of purchase for compliance or warranty purposes.',
  features: [
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
    { l: 'Storage', v: '64 GB minimum, 128 GB SSD recommended' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 12 compatible graphics' },
    { l: 'Display', v: '720p display, 9+ inch diagonal' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};
PRODUCT_DETAILS['win-10-iot-2019-entry'] = {
  desc: 'Windows 10 IoT Enterprise LTSC 2019 Entry is an entry-level embedded operating system for basic IoT devices requiring long-term stability. Designed for low-cost embedded systems, digital signage, and single-purpose devices. Includes LTSC 10-year support with no feature updates, ensuring production reliability for dedicated appliances and embedded systems.',
  features: [
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
    { l: 'RAM', v: '1 GB minimum, 2 GB recommended' },
    { l: 'Storage', v: '16 GB minimum, 32 GB recommended' },
    { l: 'TPM', v: 'TPM 1.2 recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2019-high-end'] = {
  desc: 'Windows 10 IoT Enterprise LTSC 2019 High End provides full enterprise-grade IoT capabilities with a 10-year support lifecycle. Based on Windows 10 LTSC 2019 (version 1809), this edition delivers the highest level of management, security, and deployment features for mission-critical embedded systems. Ideal for advanced medical equipment, industrial automation, and high-reliability edge computing.',
  features: [
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
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2019-value'] = {
  desc: 'Windows 10 IoT Enterprise LTSC 2019 Value provides mid-range IoT capabilities for devices requiring more features than Entry but at a moderate price. Suitable for retail POS systems, medical monitoring devices, and industrial HMIs. Includes 10-year LTSC support with enhanced lockdown features and management capabilities.',
  features: [
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
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2021-entry'] = {
  desc: 'Windows 10 IoT Enterprise LTSC 2021 Entry is an entry-level embedded operating system for basic IoT devices requiring long-term stability. Designed for low-cost embedded systems, digital signage, and single-purpose devices. Includes LTSC 10-year support with no feature updates, ensuring production reliability for dedicated appliances and embedded systems.',
  features: [
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
    { l: 'RAM', v: '1 GB minimum, 2 GB recommended' },
    { l: 'Storage', v: '16 GB minimum, 32 GB recommended' },
    { l: 'TPM', v: 'TPM 1.2 recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2021-high-end'] = {
  desc: 'Windows 10 IoT Enterprise LTSC 2021 High End is the premium IoT operating system tier for devices requiring enterprise-grade management, security, and deployment capabilities. Ideal for high-reliability embedded systems, medical workstations, and advanced industrial controllers. Includes full Windows 10 Enterprise feature set with LTSC 10-year support.',
  features: [
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
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-10-iot-2021-value'] = {
  desc: 'Windows 10 IoT Enterprise LTSC 2021 Value provides mid-range IoT capabilities for devices requiring more features than Entry but at a moderate price. Suitable for retail POS systems, medical monitoring devices, and industrial HMIs. Includes 10-year LTSC support with enhanced lockdown features and management capabilities.',
  features: [
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
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-2024-high-end'] = {
  desc: 'Windows 11 IoT Enterprise LTSC 2024 High End is the premium tier of Microsoft embedded operating system, designed for high-performance IoT and embedded devices that require the full feature set. Includes all Windows 11 Enterprise capabilities with LTSC 10-year support lifecycle. Ideal for advanced industrial automation, medical imaging systems, and high-end POS terminals.',
  features: [
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
    { l: 'GPU', v: 'DirectX 10 compatible graphics minimum' },
    { l: 'Display', v: '720p display, 8+ bit color depth' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-ml-entry'] = {
  desc: 'Windows 11 IoT Enterprise MultiLanguage Entry is a multi-language variant of the Windows 11 IoT Enterprise LTSC operating system. Supports multiple display languages including English, Chinese, Japanese, Korean, Spanish, French, German, and more. Ideal for international deployments, multi-region IoT devices, and global OEM manufacturing requiring single-image support for multiple markets.',
  features: [
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
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-ml-high-end'] = {
  desc: 'Windows 11 IoT Enterprise MultiLanguage High End is a multi-language variant of the Windows 11 IoT Enterprise LTSC operating system. Supports multiple display languages including English, Chinese, Japanese, Korean, Spanish, French, German, and more. Ideal for international deployments, multi-region IoT devices, and global OEM manufacturing requiring single-image support for multiple markets.',
  features: [
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
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-11-iot-ml-value'] = {
  desc: 'Windows 11 IoT Enterprise MultiLanguage Value is a multi-language variant of the Windows 11 IoT Enterprise LTSC operating system. Supports multiple display languages including English, Chinese, Japanese, Korean, Spanish, French, German, and more. Ideal for international deployments, multi-region IoT devices, and global OEM manufacturing requiring single-image support for multiple markets.',
  features: [
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
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'TPM', v: 'TPM 2.0 required' },
    { l: 'UEFI', v: 'UEFI firmware with Secure Boot' },
    { l: 'GPU', v: 'DirectX 10 compatible graphics' },
    { l: 'Internet', v: 'Required for initial setup and updates' },
  ],
};

PRODUCT_DETAILS['win-svr-iot-2019'] = {
  desc: 'Windows Server IoT 2019 Standard is a proven server operating system for embedded and IoT scenarios requiring long-term stability. Built on the Windows Server 2019 foundation, it delivers hybrid capabilities with Azure, enhanced security, and a flexible application platform. This 16-core license is ideal for existing deployments requiring the Windows Server 2019 long-term support channel.',
  features: [
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
    { l: 'RAM', v: '512 MB minimum, 2 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 60 GB recommended' },
    { l: 'Network', v: '1 Gbps Ethernet adapter' },
    { l: 'Firmware', v: 'UEFI 2.3.1c with Secure Boot support' },
    { l: 'TPM', v: 'TPM 2.0 recommended for advanced features' },
  ],
};

PRODUCT_DETAILS['windows-10-home-official'] = {
  desc: 'Windows 10 Home OEM Official is the consumer edition of Windows 10 with official Microsoft order documentation. Features include the familiar Start menu, Cortana assistant, Microsoft Edge browser, and Windows Hello security. Each purchase includes an official Microsoft order screenshot. Ideal for home users who want proof of purchase for warranty or future reinstallation.',
  features: [
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
    { l: 'RAM', v: '1 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};

PRODUCT_DETAILS['windows-10-pro-official'] = {
  desc: 'Windows 10 Pro OEM Official provides the professional Windows 10 experience with official Microsoft order documentation and screenshot proof of delivery. Includes BitLocker encryption, Remote Desktop, and Hyper-V virtualization. Ideal for businesses and professionals who need official Microsoft order records for compliance, auditing, or warranty purposes.',
  features: [
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
    { l: 'RAM', v: '2 GB minimum, 4 GB recommended' },
    { l: 'Storage', v: '32 GB minimum, 64 GB recommended' },
    { l: 'GPU', v: 'DirectX 9 compatible graphics, WDDM 1.0' },
    { l: 'Display', v: '800x600 resolution minimum' },
    { l: 'Firmware', v: 'UEFI or Legacy BIOS supported' },
    { l: 'TPM', v: 'TPM 1.2 recommended, TPM 2.0 supported' },
    { l: 'Internet', v: 'Required for updates and activation' },
  ],
};
