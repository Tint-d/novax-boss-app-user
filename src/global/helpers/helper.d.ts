export {};

declare global {
    interface Window {
        getUrl: (url: string) => string;
    }
}

declare global {
    interface Window {
        base64Image: (url: string) => void;
    }
}

