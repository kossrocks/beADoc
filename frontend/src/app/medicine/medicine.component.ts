import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {Medicine} from '../api/medicine';
import {MedicineService} from '../service/medicine.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  medicines: Array<Medicine>;

  constructor(private medicineService: MedicineService, private router: Router) {
  }

  ngOnInit() {

    this.medicineService.getAll()
      .subscribe((medicines: any) => {
        this.medicines = medicines;
      });

  }

  deleteMedicine(medicine: Medicine) {

    this.medicineService.delete(medicine)
      .subscribe(() => {
        this.ngOnInit();
      });

  }

  createMedicine() {
    this.router.navigate(['/medicine-form']);
  }

}
