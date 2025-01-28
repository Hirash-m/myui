import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../../services/shop/product.service';
import { product } from '../../../DTO/Shop/product';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { baseResponse } from '../../../DTO/baseResponse';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductComponent implements OnInit {


  pageNumber :number = 1;
  pageSize : number = 2 ;
  fieldToSort : string = "Id";
  sortDesc : boolean = false ;

  products: product[] = [];
  responseData : baseResponse<product> = new baseResponse<product>();
  public productForm!: FormGroup;
  isLoading: boolean = true; 
  isPopupVisible: boolean = false; 

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
 
  this.loadProducts();

    this.productForm = new FormGroup({
      id: new FormControl(0),
      productCode: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(5000),
      countTypeId: new FormControl(1),
      countTypename: new FormControl(''),
    });
  
  }


  openPopup(): void {
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const newProduct: product = this.productForm.value;
      this.productservice.insertProduct(newProduct).subscribe({
        next: (response) => {
          if (true) {
            console.log('Product added successfully:', response.data);
            this.products.push(newProduct);
            this.closePopup();
          } 
        },
        
        error: (err) => {
          this.products.push(newProduct);
          console.error('Error adding product:', err);
        },
      });
    } else {
      
      this.closePopup();
      console.error('Form is invalid');
    }
  }
  
 loadProducts(): void {  
  
  
  this.productservice.GetData(this.pageNumber, this.pageSize, this.fieldToSort, 
                                this.sortDesc).subscribe({
  next: (response) => {
    if (response.isSucceeded) {
      
      this.responseData = response;
    } else {
      console.error('Failed to fetch products:', response.message);
    }
  },
  error: (err) => {
    console.error('Error fetching products:', err);
  },
  complete: () => {
    this.isLoading = false; // تغییر وضعیت پس از تکمیل درخواست
  },
});
}

ChangePage(nextPageNimber: number){
  this.isLoading = true;
  this.pageNumber = nextPageNimber;
  this.loadProducts();

}


ChangePageSize(event : any ){
  //this.isLoading = true;
  const selectedSize = parseInt(event.target.value, 10);
  this.pageSize = selectedSize;
  this.loadProducts();

}

  

}
