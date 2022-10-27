import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spremeniVEvre'
})
export class SpremeniVEvrePipe implements PipeTransform {

  transform(centi: number): string {
    let valuta = "€";
    return `${centi / 100} ${valuta}`;
  }

}
