export interface Singup{
    name:string,
    email:string,
    password:string
}
export interface login{
    email:string,
    password:string
}
export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number,
    quantity:number|undefined,
    productId:number| undefined,
    userId:number|undefined
}
export interface cart {
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    quantity:number|undefined
    id:undefined | number,
    userId : number,
    productId : number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    newProductData:any,
    id:number|undefined
}