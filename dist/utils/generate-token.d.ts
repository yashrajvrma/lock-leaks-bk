interface TokenDataProps {
    id: string;
    email: string;
}
export declare const generateAccessToken: (data: TokenDataProps) => Promise<string>;
export declare const generateRefreshToken: ({ id }: {
    id: string;
}) => Promise<string>;
export {};
//# sourceMappingURL=generate-token.d.ts.map