export interface Address{
  address1:string;
  city: string;
  state: string;
  zipCode: string;
}

export interface FlowerDto {
  id: number;
  price: number;
  name: string;
  content: string;
  stock: number;
  img_url: number;
  delivery: boolean;
  category: string;
}

export interface AccDto {
  id: number;
  price: number;
  name: string;
  content: string;
  stock: number;
  img_url: string;
}


export interface CompleteItemDto {
  accDto: AccDto[];
  flowerDto: FlowerDto;
}
