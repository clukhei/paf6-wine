
export interface WineDetail{

    _id: string;
    price: number;
    title: string;
}

export interface Wine{
    _id: string;
    country: string;
    description: string;
    designation: string;
    points: number;
    price: number;
    province: string;
  
    title: string;
    variety: string;
    winery: string;
}