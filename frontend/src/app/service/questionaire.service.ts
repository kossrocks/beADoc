import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Questionaire} from '../api/questionaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionaireService {

  constructor(private http: HttpClient) { }

  getById(id: string) {
    return this.http.get('/api/dto/questionaires/' + id);
  }

  getAll() {
    return this.http.get('/api/questionaires').pipe(
      map((response: any) => {
        return response._embedded.questionaires;
      })
    );
  }

  delete(questionaire) {
    return this.http.delete('/api/questionaires/' + questionaire.id);
  }

  update(questionaire: Questionaire) {
    return this.http.put('/api/dto/questionaires/' + questionaire.id, questionaire);
  }

  create(questionaire: Questionaire) {
    return this.http.post('/api/dto/questionaires', questionaire);
  }



}
