import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StorageService, AlertService, ApiService } from '@services';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  private storage = inject(StorageService);
  private alert = inject(AlertService);
  private api = inject(ApiService);
  private router = inject(Router);

  protected profileImage: string = "";
  protected form = new FormGroup({
    image: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/)]),
    role: new FormControl('admin') // ['admin', 'manager', 'employee']
  })
  protected tooglePassword = signal<{ pass1: 'text' | 'password', pass2: 'text' | 'password' }>({ pass1: 'password', pass2: 'password' });

  constructor() { }

  handleTooglePassword(pass: 'pass1' | 'pass2', type: 'text' | 'password') {
    this.tooglePassword.update((value: { pass1: 'text' | 'password', pass2: 'text' | 'password' }) => ({ ...value, [pass]: [type] }));
  }

  handleImageUpload(file: any) {
    const img:File = file.target.files[0];
    if (img && this.checkType(img)) {
      this.form.controls['image'].patchValue(img);
      this.profileImage = URL.createObjectURL(img);
      console.log("this.profileImage: ", this.profileImage);
    }
  }

  private checkType(file: File) {
    return file.type.split('/')[0] === 'image' ? true : false;
  }


  protected register(form: FormGroup): void {
    if (form.valid) {
      console.log("form: ", form.value);

      // this.api.post('user/login', form.value).subscribe({
      //   next: (res: any) => {
      //     if (res.status == 200) {
      //       console.log("res: ", res);
      //       this.storage.setData(res.data);
      //       this.alert.toastify('Logged in successfully!', 'success');
      //       this.router.navigate(['/']);
      //     } else {
      //       console.error(res.message);
      //       this.alert.toastify(res.message, 'warning');
      //     }
      //   },
      //   error: (err: any) => {
      //     console.error('error: ', err);
      //     this.alert.toastify(err.message, 'error');
      //   }
      // })

    } else {
      form.markAllAsTouched();

      /**Scroll to the first invalid field */
      let _form = document.getElementById('login-form');
      if (_form) {
        let firstInvalidControl = _form.getElementsByClassName('ng-invalid')[0];
        console.log("firstInvalidControl: ", firstInvalidControl);
        firstInvalidControl?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}
