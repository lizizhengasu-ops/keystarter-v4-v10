export interface CompareColumn { slug: string; label: string; price: number; badge?: string; }
export interface CompareRow { label: string; values: Record<string, string>; }
export interface ComparisonGroup { id: string; title: string; columns: CompareColumn[]; rows: CompareRow[]; }

const WIN11_COMPARE: ComparisonGroup = {
  id: "windows-11", title: "Windows 11 Editions",
  columns: [{slug:"windows-11-home",label:"Windows 11 Home",price:13,badge:"Best Value"},{slug:"windows-11-pro",label:"Windows 11 Pro",price:18,badge:""}],
  rows: [
    {label:"BitLocker Encryption",values:{"windows-11-home":"No","windows-11-pro":"Yes"}},
    {label:"Remote Desktop",values:{"windows-11-home":"No","windows-11-pro":"Yes"}},
    {label:"Hyper-V + Windows Sandbox",values:{"windows-11-home":"No","windows-11-pro":"Yes"}},
    {label:"Group Policy + WIP",values:{"windows-11-home":"No","windows-11-pro":"Yes"}},
    {label:"Min RAM",values:{"windows-11-home":"4 GB","windows-11-pro":"4 GB"}},
    {label:"Max RAM",values:{"windows-11-home":"128 GB","windows-11-pro":"2 TB"}},
    {label:"Min Storage",values:{"windows-11-home":"64 GB","windows-11-pro":"64 GB"}},
    {label:"TPM 2.0 Required",values:{"windows-11-home":"Yes","windows-11-pro":"Yes"}},
    {label:"Snap Layouts / Teams / Widgets",values:{"windows-11-home":"Yes","windows-11-pro":"Yes"}},
    {label:"Windows Hello",values:{"windows-11-home":"Yes","windows-11-pro":"Yes"}},
    {label:"Recommended For",values:{"windows-11-home":"Home users, students","windows-11-pro":"Business, IT, power users"}}
  ]
};

const WIN10_COMPARE: ComparisonGroup = {
  id: "windows-10", title: "Windows 10 Editions",
  columns: [{slug:"windows-10-home",label:"Windows 10 Home",price:13,badge:"Best Value"},{slug:"windows-10-pro",label:"Windows 10 Pro",price:18,badge:""}],
  rows: [
    {label:"BitLocker Encryption",values:{"windows-10-home":"No","windows-10-pro":"Yes"}},
    {label:"Remote Desktop",values:{"windows-10-home":"No","windows-10-pro":"Yes"}},
    {label:"Hyper-V",values:{"windows-10-home":"No","windows-10-pro":"Yes"}},
    {label:"Group Policy + WIP",values:{"windows-10-home":"No","windows-10-pro":"Yes"}},
    {label:"Min RAM (64-bit)",values:{"windows-10-home":"2 GB","windows-10-pro":"2 GB"}},
    {label:"Max RAM",values:{"windows-10-home":"128 GB","windows-10-pro":"2 TB"}},
    {label:"Min Storage (64-bit)",values:{"windows-10-home":"20 GB","windows-10-pro":"20 GB"}},
    {label:"Windows Hello",values:{"windows-10-home":"Yes","windows-10-pro":"Yes"}},
    {label:"Recommended For",values:{"windows-10-home":"Home users","windows-10-pro":"Business, power users"}}
  ]
};

const OFFICE_COMPARE: ComparisonGroup = {
  id: "office", title: "Office Professional Plus",
  columns: [{slug:"office-2019-pro-plus",label:"Office 2019",price:48,badge:"Best Value"},{slug:"office-2021-pro-plus",label:"Office 2021",price:58,badge:"Latest"}],
  rows: [
    {label:"Includes Word/Excel/PPT",values:{"office-2019-pro-plus":"Yes","office-2021-pro-plus":"Yes"}},
    {label:"Outlook + Publisher + Access",values:{"office-2019-pro-plus":"Yes","office-2021-pro-plus":"Yes"}},
    {label:"Dark Mode",values:{"office-2019-pro-plus":"No","office-2021-pro-plus":"Yes"}},
    {label:"XLOOKUP / Dynamic Arrays",values:{"office-2019-pro-plus":"No","office-2021-pro-plus":"Yes"}},
    {label:"Co-authoring",values:{"office-2019-pro-plus":"Basic","office-2021-pro-plus":"Enhanced"}},
    {label:"Supported OS",values:{"office-2019-pro-plus":"Win10, Server 2019","office-2021-pro-plus":"Win11, Win10, Server 2019"}},
    {label:"License",values:{"office-2019-pro-plus":"Perpetual (1 PC)","office-2021-pro-plus":"Perpetual (1 PC)"}},
    {label:"Support End",values:{"office-2019-pro-plus":"Oct 2025","office-2021-pro-plus":"Oct 2026"}}
  ]
};

const IOT2024_COMPARE: ComparisonGroup = {
  id: "iot-2024", title: "Windows 11 IoT Enterprise LTSC 2024",
  columns: [{slug:"win-11-iot-2024-entry",label:"Entry",price:45,badge:"Basic"},{slug:"win-11-iot-2024-value",label:"Value",price:85,badge:"Popular"},{slug:"win-11-iot-2024-high-end",label:"High End",price:160,badge:"Full"}],
  rows: [
    {label:"Min RAM",values:{"win-11-iot-2024-entry":"4 GB","win-11-iot-2024-value":"4 GB","win-11-iot-2024-high-end":"4 GB"}},
    {label:"Min Storage",values:{"win-11-iot-2024-entry":"64 GB","win-11-iot-2024-value":"64 GB","win-11-iot-2024-high-end":"64 GB"}},
    {label:"UWF + Assigned Access",values:{"win-11-iot-2024-entry":"Yes","win-11-iot-2024-value":"Yes","win-11-iot-2024-high-end":"Yes"}},
    {label:"BitLocker",values:{"win-11-iot-2024-entry":"No","win-11-iot-2024-value":"Yes","win-11-iot-2024-high-end":"Yes"}},
    {label:"Device Guard + AppLocker",values:{"win-11-iot-2024-entry":"No","win-11-iot-2024-value":"No","win-11-iot-2024-high-end":"Yes"}},
    {label:"LTSC Support",values:{"win-11-iot-2024-entry":"10 years","win-11-iot-2024-value":"10 years","win-11-iot-2024-high-end":"10 years"}},
    {label:"Ideal For",values:{"win-11-iot-2024-entry":"Basic kiosk","win-11-iot-2024-value":"Retail POS, monitors","win-11-iot-2024-high-end":"Industrial, medical"}}
  ]
};

const IOT2021_COMPARE: ComparisonGroup = {
  id: "iot-2021", title: "Windows 10 IoT Enterprise LTSC 2021",
  columns: [{slug:"win-10-iot-2021-entry",label:"Entry",price:45,badge:"Basic"},{slug:"win-10-iot-2021-value",label:"Value",price:85,badge:"Popular"},{slug:"win-10-iot-2021-high-end",label:"High End",price:160,badge:"Full"}],
  rows: [
    {label:"Min RAM",values:{"win-10-iot-2021-entry":"2 GB","win-10-iot-2021-value":"2 GB","win-10-iot-2021-high-end":"4 GB"}},
    {label:"Min Storage",values:{"win-10-iot-2021-entry":"32 GB","win-10-iot-2021-value":"32 GB","win-10-iot-2021-high-end":"64 GB"}},
    {label:"UWF + Assigned Access",values:{"win-10-iot-2021-entry":"Yes","win-10-iot-2021-value":"Yes","win-10-iot-2021-high-end":"Yes"}},
    {label:"BitLocker",values:{"win-10-iot-2021-entry":"No","win-10-iot-2021-value":"Yes","win-10-iot-2021-high-end":"Yes"}},
    {label:"Device Guard + AppLocker",values:{"win-10-iot-2021-entry":"No","win-10-iot-2021-value":"No","win-10-iot-2021-high-end":"Yes"}},
    {label:"LTSC Support",values:{"win-10-iot-2021-entry":"10 years","win-10-iot-2021-value":"10 years","win-10-iot-2021-high-end":"10 years"}},
    {label:"Ideal For",values:{"win-10-iot-2021-entry":"Basic kiosk","win-10-iot-2021-value":"Retail POS, monitors","win-10-iot-2021-high-end":"Industrial, medical"}}
  ]
};

const IOT2019_COMPARE: ComparisonGroup = {
  id: "iot-2019", title: "Windows 10 IoT Enterprise LTSC 2019",
  columns: [{slug:"win-10-iot-2019-entry",label:"Entry",price:45,badge:"Basic"},{slug:"win-10-iot-2019-value",label:"Value",price:85,badge:"Popular"},{slug:"win-10-iot-2019-high-end",label:"High End",price:160,badge:"Full"}],
  rows: [
    {label:"Min RAM",values:{"win-10-iot-2019-entry":"2 GB","win-10-iot-2019-value":"2 GB","win-10-iot-2019-high-end":"4 GB"}},
    {label:"Min Storage",values:{"win-10-iot-2019-entry":"32 GB","win-10-iot-2019-value":"32 GB","win-10-iot-2019-high-end":"64 GB"}},
    {label:"UWF + Assigned Access",values:{"win-10-iot-2019-entry":"Yes","win-10-iot-2019-value":"Yes","win-10-iot-2019-high-end":"Yes"}},
    {label:"BitLocker",values:{"win-10-iot-2019-entry":"No","win-10-iot-2019-value":"Yes","win-10-iot-2019-high-end":"Yes"}},
    {label:"Device Guard + AppLocker",values:{"win-10-iot-2019-entry":"No","win-10-iot-2019-value":"No","win-10-iot-2019-high-end":"Yes"}},
    {label:"LTSC Support",values:{"win-10-iot-2019-entry":"10 years","win-10-iot-2019-value":"10 years","win-10-iot-2019-high-end":"10 years"}},
    {label:"Ideal For",values:{"win-10-iot-2019-entry":"Basic kiosk","win-10-iot-2019-value":"Retail POS, monitors","win-10-iot-2019-high-end":"Industrial, medical"}}
  ]
};

const IOTML_COMPARE: ComparisonGroup = {
  id: "iot-ml", title: "Windows 11 IoT Enterprise LTSC 2024 MultiLanguage",
  columns: [{slug:"win-11-iot-ml-entry",label:"Entry",price:45,badge:"Basic"},{slug:"win-11-iot-ml-value",label:"Value",price:85,badge:"Popular"},{slug:"win-11-iot-ml-high-end",label:"High End",price:160,badge:"Full"}],
  rows: [
    {label:"Min RAM",values:{"win-11-iot-ml-entry":"4 GB","win-11-iot-ml-value":"4 GB","win-11-iot-ml-high-end":"4 GB"}},
    {label:"Min Storage",values:{"win-11-iot-ml-entry":"64 GB","win-11-iot-ml-value":"64 GB","win-11-iot-ml-high-end":"64 GB"}},
    {label:"Display Languages",values:{"win-11-iot-ml-entry":"30+","win-11-iot-ml-value":"30+","win-11-iot-ml-high-end":"30+"}},
    {label:"UWF + Assigned Access",values:{"win-11-iot-ml-entry":"Yes","win-11-iot-ml-value":"Yes","win-11-iot-ml-high-end":"Yes"}},
    {label:"BitLocker",values:{"win-11-iot-ml-entry":"No","win-11-iot-ml-value":"Yes","win-11-iot-ml-high-end":"Yes"}},
    {label:"Device Guard + AppLocker",values:{"win-11-iot-ml-entry":"No","win-11-iot-ml-value":"No","win-11-iot-ml-high-end":"Yes"}},
    {label:"LTSC Support",values:{"win-11-iot-ml-entry":"10 years","win-11-iot-ml-value":"10 years","win-11-iot-ml-high-end":"10 years"}},
    {label:"Ideal For",values:{"win-11-iot-ml-entry":"Global kiosk","win-11-iot-ml-value":"Multi-region POS","win-11-iot-ml-high-end":"Global industrial, medical"}}
  ]
};

const SERVER_COMPARE: ComparisonGroup = {
  id: "server", title: "Windows Server IoT Standard",
  columns: [{slug:"win-svr-iot-2019",label:"Server 2019",price:789,badge:"Proven"},{slug:"win-svr-iot-2022",label:"Server 2022",price:850,badge:"Stable"},{slug:"win-svr-iot-2025",label:"Server 2025",price:944,badge:"Latest"}],
  rows: [
    {label:"Core License",values:{"win-svr-iot-2019":"16-core","win-svr-iot-2022":"16-core","win-svr-iot-2025":"16-core"}},
    {label:"Secured-core",values:{"win-svr-iot-2019":"No","win-svr-iot-2022":"Yes","win-svr-iot-2025":"Yes"}},
    {label:"Azure Arc",values:{"win-svr-iot-2019":"Limited (Azure hybrid)","win-svr-iot-2022":"Yes","win-svr-iot-2025":"Yes + AI"}},
    {label:"Storage Spaces Direct",values:{"win-svr-iot-2019":"Yes","win-svr-iot-2022":"Yes","win-svr-iot-2025":"Yes"}},
    {label:"Linux Containers",values:{"win-svr-iot-2019":"Yes","win-svr-iot-2022":"Yes","win-svr-iot-2025":"Yes"}},
    {label:"Min RAM",values:{"win-svr-iot-2019":"2 GB","win-svr-iot-2022":"2 GB","win-svr-iot-2025":"2 GB"}},
    {label:"Min Storage",values:{"win-svr-iot-2019":"32 GB","win-svr-iot-2022":"32 GB","win-svr-iot-2025":"32 GB"}}
  ]
};

const SQL_COMPARE: ComparisonGroup = {
  id: "sql", title: "SQL Server Standard Runtime",
  columns: [{slug:"sql-svr-2019-runtime",label:"SQL 2019",price:189,badge:"Stable"},{slug:"sql-svr-2022-runtime",label:"SQL 2022",price:229,badge:"Latest"}],
  rows: [
    {label:"Intelligent Query Processing",values:{"sql-svr-2019-runtime":"Basic","sql-svr-2022-runtime":"Enhanced"}},
    {label:"Big Data Clusters",values:{"sql-svr-2019-runtime":"Yes","sql-svr-2022-runtime":"Replaced by Fabric/LEDGER"}},
    {label:"LEDGER Tables",values:{"sql-svr-2019-runtime":"No","sql-svr-2022-runtime":"Yes"}},
    {label:"Always On AG",values:{"sql-svr-2019-runtime":"Yes","sql-svr-2022-runtime":"Yes"}},
    {label:"Min CPU",values:{"sql-svr-2019-runtime":"1.4 GHz","sql-svr-2022-runtime":"1.4 GHz"}},
    {label:"Min RAM / Storage",values:{"sql-svr-2019-runtime":"1 GB / 6 GB","sql-svr-2022-runtime":"1 GB / 6 GB"}},
    {label:".NET Framework",values:{"sql-svr-2019-runtime":"4.6.2","sql-svr-2022-runtime":"4.7.2"}}
  ]
};

export const COMPARISON_MAP: Record<string, string> = {
  "windows-11-home":"windows-11","windows-11-pro":"windows-11",
  "windows-11-home-official":"windows-11","windows-11-pro-official":"windows-11",
  "windows-10-home":"windows-10","windows-10-pro":"windows-10",
  "windows-10-home-official":"windows-10","windows-10-pro-official":"windows-10",
  "office-2019-pro-plus":"office","office-2021-pro-plus":"office",
  "win-11-iot-2024-entry":"iot-2024","win-11-iot-2024-value":"iot-2024","win-11-iot-2024-high-end":"iot-2024",
  "win-10-iot-2021-entry":"iot-2021","win-10-iot-2021-value":"iot-2021","win-10-iot-2021-high-end":"iot-2021",
  "win-10-iot-2019-entry":"iot-2019","win-10-iot-2019-value":"iot-2019","win-10-iot-2019-high-end":"iot-2019",
  "win-11-iot-ml-entry":"iot-ml","win-11-iot-ml-value":"iot-ml","win-11-iot-ml-high-end":"iot-ml",
  "win-svr-iot-2019":"server","win-svr-iot-2022":"server","win-svr-iot-2025":"server",
  "sql-svr-2019-runtime":"sql","sql-svr-2022-runtime":"sql"
};

export const COMPARISON_GROUPS: Record<string, ComparisonGroup> = {
  "windows-11": WIN11_COMPARE, "windows-10": WIN10_COMPARE, "office": OFFICE_COMPARE,
  "iot-2024": IOT2024_COMPARE, "iot-2021": IOT2021_COMPARE, "iot-2019": IOT2019_COMPARE, "iot-ml": IOTML_COMPARE,
  "server": SERVER_COMPARE, "sql": SQL_COMPARE
};

export const FAQ_SERIES_MAP: Record<string, string> = {
  "windows-11-home":"win-consumer","windows-11-pro":"win-consumer",
  "windows-11-home-official":"win-official","windows-11-pro-official":"win-official",
  "windows-10-home":"win-consumer","windows-10-pro":"win-consumer",
  "windows-10-home-official":"win-official","windows-10-pro-official":"win-official",
  "office-2019-pro-plus":"office","office-2021-pro-plus":"office",
  "win-11-iot-2024-entry":"iot","win-11-iot-2024-value":"iot","win-11-iot-2024-high-end":"iot",
  "win-10-iot-2021-entry":"iot","win-10-iot-2021-value":"iot","win-10-iot-2021-high-end":"iot",
  "win-10-iot-2019-entry":"iot","win-10-iot-2019-value":"iot","win-10-iot-2019-high-end":"iot",
  "win-11-iot-ml-entry":"iot","win-11-iot-ml-value":"iot","win-11-iot-ml-high-end":"iot",
  "win-svr-iot-2019":"server","win-svr-iot-2022":"server","win-svr-iot-2025":"server",
  "sql-svr-2019-runtime":"sql","sql-svr-2022-runtime":"sql"
};
