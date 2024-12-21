export interface IMovie{
    id:number;
    title:string;
    description:string;
    releaseDate:Date;
    poster:string;
    rating:number;
    backdrop:string;
}

export interface CompleteMovie extends IMovie{
    generes:string[];
    duration:number;
    budget:number;
    originalTitle:string;
    productionCompanies:string[];
}