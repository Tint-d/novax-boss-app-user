export {};

declare global {
    interface Window {
        getUrl: (url: string) => string;
    }
}