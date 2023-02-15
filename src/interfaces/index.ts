export interface IBoard {
    readonly id: number;
    readonly title: string;
    readonly items: IItem[];
}

export interface IItem {
    readonly id: number,
    readonly title: string,
    readonly text: string
}
