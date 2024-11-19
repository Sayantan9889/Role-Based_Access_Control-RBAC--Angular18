import { afterNextRender, Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertService, ApiService } from '@services';
import { RouterLink } from '@angular/router';

export interface PeriodicElement {
  image: string,
  name: string,
  price: number,
  type: string,
  status: string,
  id: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private api = inject(ApiService);
  private alert = inject(AlertService);

  displayedColumns: string[] = ['image', 'name', 'price', 'type', 'status', 'action'];
  dataSource!: MatTableDataSource<PeriodicElement>;

  constructor() {
    this.fetchAllPRoducts();
  }

  private fetchAllPRoducts() {
    let rowData: any[] = [];
    this.api.get('/get/products').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          // console.log("product list: ", res.data);
          res.data.forEach((prod: any) => {
            rowData.push({
              image: prod.images ? prod.images[0] : '',
              name: prod.name,
              price: prod.price,
              type: prod.product_type,
              status: prod.status,
              id: prod._id
            })
          })
          this.dataSource = new MatTableDataSource(rowData);
        }
        else {
          this.alert.toastify(res.message || 'Failed to fetch products', 'warning');
        }
      },
      error: (error) => {
        this.alert.toastify(error.message || 'Failed to fetch products', 'error');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editProduct(element: any) {
    console.log("edit element: ", element);

  }

  deleteProduct(element: any) {
    console.log("delete element: ", element);

  }
}
