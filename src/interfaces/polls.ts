export interface Poll {
    _id: string;
    question: string;
    options: { text: string; votes: number }[];
}
