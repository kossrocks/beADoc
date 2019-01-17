import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../api/user';

@Pipe({
  name: 'sortingUsers'
})
export class SortingUsersPipe implements PipeTransform {

  transform(users: User[], path: string[], order: number): User[] {

    // Check if is not null
    if (!users || !path || !order) {
      return users;
    }

    return users.sort((a: User, b: User) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      });

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    });
  }

}
