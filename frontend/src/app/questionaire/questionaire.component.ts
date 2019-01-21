import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionaireService} from '../service/questionaire.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {

  questionaireForm;

  constructor(private route: ActivatedRoute, private router: Router, private questionaireService: QuestionaireService,
              private toastr: ToastrService) { }

  ngOnInit() {

    this.questionaireForm = new FormGroup({
      'id': new FormControl(),
      'answer1': new FormControl(),
      'answer2': new FormControl(),
      'answer3': new FormControl(),
      'answer4': new FormControl(),
      'answer5': new FormControl(),
      'answer6': new FormControl(),
      'answer7': new FormControl(),
      'answer8': new FormControl(),
      'answer9': new FormControl(),
      'answer10': new FormControl(),
      'users': new FormControl(),
    });

    const id = this.route.snapshot.paramMap.get('id');

    this.questionaireService.getById(id)
      .subscribe((response) => {
        this.questionaireForm.setValue(response);
      });


  }

  saveQuestionaire() {
    const questionaire = this.questionaireForm.value;
    this.questionaireService.update(questionaire)
      .subscribe((response) => {
        this.toastr.info('You successfully updated your Questionaire', 'Questionaire!');
        this.questionaireForm.setValue(response);
        this.navigateToList();

      });
  }

  navigateToList() {
    this.router.navigate(['/']);
  }

}
