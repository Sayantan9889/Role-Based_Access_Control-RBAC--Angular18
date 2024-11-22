import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected user:any;
  protected form:FormGroup = new FormGroup({
    image: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    isVarified: new FormControl(''),
  });
  protected profileImage: string = '';


  handleImageUpload(file: any) {
    const img:File = file.target.files[0];
    if (img && this.checkType(img)) {
      this.form.controls['image'].patchValue(img);
      this.profileImage = URL.createObjectURL(img);
    }
  }

  private checkType(file: File) {
    return file.type.split('/')[0] === 'image' ? true : false;
  }

  updateProfile() {

  }
}
