export class  product {
    "id": number
    "productCode": string
    "name": string
    "price": number
    "countTypeId": number
    "countTypename": string
   
    constructor(
        id: number,
        productCode: string,
        name: string,
        price: number,
        countTypeId: number,
        countTypename: string
    ) {
        this.id = id;
        this.productCode = productCode;
        this.name = name;
        this.price = price;
        this.countTypeId = countTypeId;
        this.countTypename = countTypename
        
    }
    
}