import type { Seller } from "./sellerTypes";

export interface Product{
    id?:number,              // ? means optional
    title:string,
    description:string,
    mrpPrice:number,
    sellingPrice:number,
    discountPercent:number,
    quantity:number,
    color:string,
    images:string[],
    numRatings?:number,
    category?:Category,
    seller?:Seller;
    createdAt?:Date;
    size?:string;
}


export interface Category {
    id?: number;
    name: string;
    categoryId: string;
    parentCategory?: Category;
    level: number;
}