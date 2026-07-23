// Shared page configuration — keeps Home.tsx lean

export const SPECIAL_OFFER_IDS = [
  'windows-11-pro','windows-10-pro','windows-11-home','windows-10-home',
  'office-2019-pro-plus','office-2021-pro-plus'
];

export const images: Record<string, string> = {
  'windows-11-pro':'https://img.icons8.com/color/96/windows-11.png',
  'windows-10-pro':'https://img.icons8.com/color/96/windows-10.png',
  'windows-11-home':'https://img.icons8.com/color/96/windows-11.png',
  'windows-10-home':'https://img.icons8.com/color/96/windows-10.png',
  'office-2019-pro-plus':'https://img.icons8.com/color/96/microsoft-office-2019.png',
  'office-2021-pro-plus':'https://img.icons8.com/color/96/microsoft-office-365.png',
};

export const IMAGES: Record<string, string>[] = [
  {id:'windows-11-pro',url:'https://img.icons8.com/color/96/windows-11.png'},
  {id:'windows-10-pro',url:'https://img.icons8.com/color/96/windows-10.png'},
  {id:'office-2019-pro-plus',url:'https://img.icons8.com/color/96/microsoft-office-2019.png'},
  {id:'office-2021-pro-plus',url:'https://img.icons8.com/color/96/microsoft-office-365.png'},
];
