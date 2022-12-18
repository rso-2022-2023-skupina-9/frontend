import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spremeniVEvre'
})
export class SpremeniVEvrePipe implements PipeTransform {

  transform(centi: number): string {
    let valuta = "€";
    let evri = (centi / 100).toFixed(2);
    return `${evri} ${valuta}`;
  }

}
