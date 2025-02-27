export interface PlatformConfig {
    authEndPoint: string;
    sessionCookieName: string;
}

export const defaultPlatformConfig: PlatformConfig = {
    authEndPoint: 'api/v2/barong',
    sessionCookieName: '_barong_session',
};
