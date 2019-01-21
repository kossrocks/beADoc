import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MedicineService} from '../service/medicine.service';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent implements OnInit {

  medicineForm;
  shouldNavigateToList: boolean;

  constructor(private medicineService: MedicineService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.medicineForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl('', [Validators.required]),
      'dosage': new FormControl(),
      'sideEffects': new FormControl(),
      'consumers': new FormControl()
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicineService.getById(id)
        .subscribe((response) => {
          this.medicineForm.setValue(response);
        });
    }
  }

  saveMedicine() {

    const medicine = this.medicineForm.value;
    if (medicine.id) {
      this.medicineService.update(medicine)
        .subscribe((response) => {
          alert('updated successfully');
          this.medicineForm.setValue(response);
          if (this.shouldNavigateToList) {
            this.navigateToList();
          }
        });
    } else {
      this.medicineService.create(medicine)
        .subscribe((response: any) => {
          alert('created successfully');
          if (this.shouldNavigateToList) {
            this.navigateToList();
          } else {
            this.router.navigate(['/medicine-form', response.id]);
          }
        });
    }

  }

  navigateToList() {
    this.router.navigate(['/medicine-list']);
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

}

