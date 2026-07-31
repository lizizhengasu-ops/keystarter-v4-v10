# v7.4 product research coverage (2026-07-31)

Every product page was reviewed against the official Microsoft Learn / support
documentation saved in `docs/research/` and the corresponding data was updated
in `src/data/product-details.ts` and `src/data/product-comparison.ts`.

## Windows 11 family (source: windows-office-req.txt)
- windows-11-home
- windows-11-pro
- windows-11-home-official
- windows-11-pro-official

Updated: shortened descriptions, tags, RAM 4/8 GB, storage 64/128 GB, TPM 2.0,
DirectX 12 / WDDM 2.0, HD display, Microsoft account requirement.

## Windows 10 family (source: windows-office-req.txt)
- windows-10-home
- windows-10-pro
- windows-10-home-official
- windows-10-pro-official

Updated: shortened descriptions, tags, RAM 1/2 GB minimum (32/64-bit), storage
16/20 GB minimum, firmware UEFI, TPM 1.2 recommended / 2.0 supported.

## Office family (source: windows-office-req.txt)
- office-2019-pro-plus
- office-2021-pro-plus

Updated: shortened descriptions, tags, RAM 4/8 GB, CPU 1.6 GHz 2-core, disk
4 GB, 1280x768 display, supported OS and browser rows.

## Windows 11 IoT Enterprise LTSC 2024 (source: iot-ent.txt)
- win-11-iot-2024-entry
- win-11-iot-2024-value
- win-11-iot-2024-high-end
- win-11-iot-ml-entry
- win-11-iot-ml-value
- win-11-iot-ml-high-end

Updated: shortened descriptions, tags, Windows 11 hardware baseline (4 GB RAM,
64 GB storage, TPM 2.0, UEFI Secure Boot, DirectX 12 / WDDM 2.0), 10-year LTSC
support and tier feature rows in the comparison table.

## Windows 10 IoT Enterprise LTSC 2019/2021 (source: iot-ent.txt)
- win-10-iot-2019-entry
- win-10-iot-2019-value
- win-10-iot-2019-high-end
- win-10-iot-2021-entry
- win-10-iot-2021-value
- win-10-iot-2021-high-end

Updated: shortened descriptions, tags, RAM/disk minimums, TPM, WDDM, display and
firmware rows, plus separate 2019 and 2021 comparison groups.

## Windows Server IoT (source: winserver2022-req.txt)
- win-svr-iot-2019
- win-svr-iot-2022
- win-svr-iot-2025

Updated: shortened descriptions, tags, RAM 2/4 GB, storage 32/60 GB, 1 Gbps
network, SVGA display, UEFI 2.3.1c / Secure Boot, TPM 2.0, and comparison rows
for secured-core, Azure Arc, Storage Spaces Direct, and containers.

## SQL Server Standard Runtime (source: sql2022-req.txt)
- sql-svr-2019-runtime
- sql-svr-2022-runtime

Updated: shortened descriptions, tags, CPU 1.4/2.0 GHz, RAM 1/4 GB, storage 6 GB,
Super-VGA monitor, .NET requirement, OS support, and precise comparison rows.
