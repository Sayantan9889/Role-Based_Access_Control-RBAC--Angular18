import { afterNextRender, Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertService, ApiService } from '@services';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private api = inject(ApiService);
  private alert = inject(AlertService);

  displayedColumns: string[] = ['image', 'name', 'price', 'type', 'status', 'action'];
  dataSource!: MatTableDataSource<PeriodicElement>;

  constructor() {
    afterNextRender(() => {
      this.fetchAllPRoducts();
    })
  }

  private fetchAllPRoducts() {
    let ELEMENT_DATA: any[] = [];
    this.api.get('/get/products').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          console.log("res: ", res);
          res.data.forEach((prod: any) => {
            ELEMENT_DATA.push({
              image: prod.images ? prod.images[0] : '',
              name: prod.name,
              price: prod.price,
              type: prod.product_type,
              status: prod.status,
              action: 'Action'
            })
          })
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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
}
