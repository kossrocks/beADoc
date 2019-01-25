import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], fields: string[], value: string): any[] { //search the table for specific entries
    if (!items) {
      return [];
    }
    if (!fields || !value) {
      return items;
    }

    let list = [];

    for(let field of fields) {
      let fieldList = items.filter(singleItem =>
        singleItem[field].toLowerCase().includes(value.toLowerCase())
      );

      list = this.merge_array(list, fieldList);
    }
    return items.filter(entry => //return entries and prevent unwanted sorting
      list.includes(entry)
    );


  }
  merge_array(array1, array2) { //merge two arrays and remove duplicates

    let arr = array1.concat(array2);

    let returnList = [];
    for (let entry of arr ){
      if(!returnList.includes(entry)){
        returnList.push(entry);
      }
    }


    return returnList;
  }
}
