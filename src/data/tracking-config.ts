export interface TrackingConfig {
  gtmId: string;
  gaMeasurementId: string;
  consentMode: boolean;
  defaultConsent: "denied";
}

export const TRACKING_CONFIG: TrackingConfig = {
  gtmId: "G-SVM4WGFYKD",
  gaMeasurementId: "G-SVM4WGFYKD",
  consentMode: true,
  defaultConsent: "denied",
};
