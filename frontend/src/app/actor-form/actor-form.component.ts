import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actor} from '../api/actor';
import {ActivatedRoute, Router} from '@angular/router';
import {ActorService} from '../service/actor.service';
import {MovieService} from '../service/movie.service';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {SocketMessageService} from '../service/socket-message.service';


@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.scss']
})
export class ActorFormComponent implements OnInit, OnDestroy {

  actorForm;
  shouldNavigateToList: boolean;
  movieOptions;

  constructor(private actorService: ActorService, private route: ActivatedRoute, private router: Router,
              private movieService: MovieService, private socketMessageService: SocketMessageService) {
  }
  //deleteme

  ngOnInit() {

    this.actorForm = new FormGroup({
      'id': new FormControl(),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'lastName': new FormControl(),
      'rating': new FormControl(),
      'movies': new FormControl(),
      'dayOfBirth': new FormControl(),
      'gender': new FormControl(),
      'alive': new FormControl(),
      'pictures': new FormControl(),
    });

    this.socketMessageService.connect();
    this.socketMessageService.subscribe();
    this.socketMessageService.receive().subscribe(message => {
      alert(message.message);
    });

    this.actorForm.controls.rating.valueChanges
      .subscribe((newValue) => {
        if (newValue > 5) {
          this.actorForm.controls.alive.setValue(true);
        }
      });

    this.movieService.getAll()
      .subscribe((movies: any) => {
        this.movieOptions = movies;
      });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.actorService.getById(id)
        .subscribe((response) => {
          this.actorForm.setValue(response);
        });
    }
  }

  ngOnDestroy(): void {
    this.socketMessageService.unsubscribe();
    this.socketMessageService.disconnect();
  }


  saveActor() {

    const actor = this.actorForm.value;
    if (actor.id) {
      this.actorService.update(actor)
        .subscribe((response) => {
          alert('updated successfully');
          this.actorForm.setValue(response);
          if (this.shouldNavigateToList) {
            this.navigateToList();
          }
        });
    } else {
      this.actorService.create(actor)
        .subscribe((response: any) => {
          alert('created successfully');
          if (this.shouldNavigateToList) {
            this.navigateToList();
          } else {
            this.router.navigate(['/actor-form', response.id]);
          }
        });
    }

  }



  sendMessage() {
    this.socketMessageService.sendMessage({message: 'test'});
  }

  navigateToList() {
    this.router.navigate(['/actor-list']);
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

}
