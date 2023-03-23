export interface DATE_FMT {
    "Y+": String;
    "m+": String;
    "d+": String;
    "H+": String;
    "M+": String;
    "S+": String;
    "W+": String;
}
export declare function dateFmt(date?: Date, fmt?: string): string;
