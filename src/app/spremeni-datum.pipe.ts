import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spremeniDatum'
})
export class SpremeniDatumPipe implements PipeTransform {

  transform(datum: string): string {
    const t = new Date(datum);
    return t.toLocaleDateString();
  }

}
