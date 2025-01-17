import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../../services/shop/product.service';
import { product } from '../../../DTO/Shop/product';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddproductComponent } from './addproduct/addproduct.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, ReactiveFormsModule, AddproductComponent],
})
export class ProductComponent implements OnInit {

  products: product[] = [];
  public productForm!: FormGroup;
  isLoading: boolean = true; 
  isPopupVisible: boolean = false; 

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.productservice.GetData(1, 100, 'Id', true).subscribe({
      next: (response) => {
        if (response.isSucceeded) {
          this.products = response.data;
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
          if (response.isSucceeded) {
            console.log('Product added successfully:', response.data);
            
            this.closePopup();
          } else {
            console.error('Failed to add product:', response.message);
          }
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
 

  

}
