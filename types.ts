import { StaticImageData } from "next/image";

type Price = {
    [key: string] : number
}

export type DummyProducts = {
    id: number;
    title: string;
    images: (string | StaticImageData)[] ,
    price: Price
    description: string;
    category: string;
    type: string;
    sizes: string[],
    date: number;
    popular: boolean;
    inStock: boolean;
}

export type Blogs = {
    title: string;
    category: string;
    image_url: string | StaticImageData;
    description: string;
}