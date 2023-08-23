export declare const formateData: (primaryContactId: any) => Promise<{
    contact: {
        primaryContactId: any;
        emails: (string | null)[][];
        phoneNumbers: (string | null)[][];
        secondaryContactIds: number[][];
    };
    message?: undefined;
} | {
    message: string;
    contact?: undefined;
}>;
