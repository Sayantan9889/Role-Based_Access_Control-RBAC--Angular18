import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  protected images: Array<{ file: any, url: string }> = [];
  protected form: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    product_type: new FormControl(''),
  });

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
    const inputElement:any = document.getElementById('file-upload');
    inputElement && (inputElement.values = []);
  }

  private checkType(file: File) {
    return file.type.split('/')[0] === 'image' ? true : false;
  }
}
