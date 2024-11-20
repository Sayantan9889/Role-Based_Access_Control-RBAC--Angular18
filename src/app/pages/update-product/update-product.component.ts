import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { AlertService, ApiService } from '@services';
import { Router } from 'express';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  private api = inject(ApiService);
  private alert = inject(AlertService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected images: Array<{ file: any, url: string }> = [];
  protected form: FormGroup = new FormGroup({
    imageArr: new FormControl(''),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    product_type: new FormControl('New'),
  });

  // constructor() {
  //   const productId = this.activatedRoute.snapshot.paramMap.get('id');
  //   if(productId) this.fetchProduct(productId);
  //   else this.alert.toastify('Could not find id from url.', 'error')
  // }

  private fetchProduct(id:string) {
    this.api.get(`get/products/${id}`).subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          console.log("product: ", res.data);
          const product = res.data;
          this.form.patchValue({
            imageArr: product.images? product.images[0] : '',
            name: product.name,
            price: product.price,
            description: product.description,
            product_type: product.product_type,
          });
          this.images = [... product.images]
          this.form.markAllAsTouched();
        }
        else {
          this.alert.toastify(res.message || 'Failed to fetch product', 'warning');
        }
      },
      error: (error: any) => {
        this.alert.toastify(error.message || 'Failed to fetch product', 'error');
      }
    });
  }

  protected handleImages(event: any) {
    console.log("event: ", event.target?.files);
    Object.values(event.target?.files as Array<File>).forEach((file: File) => {
      if (this.checkType(file)) {
        this.images.push({ file: file, url: URL.createObjectURL(file) })
      }
    })
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    const inputElement: any = document.getElementById('file-upload');
    inputElement && (inputElement.values = []);
  }

  private checkType(file: File) {
    return file.type.split('/')[0] === 'image' ? true : false;
  }

  protected updateProduct() {

  }
}
