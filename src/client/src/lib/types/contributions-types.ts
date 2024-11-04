export interface Contribution {
    id: string;
    userId: string;
    text: string;
    createdAt: string;
    userName: string;
}

export interface PublishContribution {
    userId: string;
    text: string;
    priority: number
}