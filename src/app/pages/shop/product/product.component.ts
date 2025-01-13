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
export class ProductComponent implements OnInit, AfterViewInit {
  products: product[] = [];

  public productForm!: FormGroup;

  @ViewChild(AddproductComponent, { static: false }) addProductComponent!: AddproductComponent;

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.productservice.GetData(1, 100, 'Id', true).subscribe((response) => {
      if (response.isSucceeded) {
        this.products = response.data;
      } else {
        console.error('Failed to fetch products:', response.message);
      }
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

  ngAfterViewInit(): void {
    // اطمینان حاصل کنید که addProductComponent بارگذاری شده است
    if (this.addProductComponent) {
      console.log('AddProductComponent بارگذاری شد');
    } else {
      console.error('AddProductComponent بارگذاری نشده است');
    }
  }

  openPopup() {
    // اطمینان از اینکه addProductComponent قبل از فراخوانی متد open() بارگذاری شده باشد
    if (this.addProductComponent) {
      console.log('در حال باز کردن پاپ آپ');
      this.addProductComponent.open();
    } else {
      console.error('AddProductComponent بارگذاری نشده است');
    }
  }

  handleProductAdded(product: { name: string, price: number }) {
    console.log('محصول اضافه شد:', product);
    // اینجا می‌توانید محصول را ذخیره کنید یا به سرور ارسال کنید
  }

  addProduct() {
    const product = this.productForm.value;
    this.productservice.insertProduct(product).subscribe((response) => {
      if (response.isSucceeded) {
        this.products.push(product);
      } else {
        console.error('Failed to insert product:', response.message);
      }
    });
  }
}
