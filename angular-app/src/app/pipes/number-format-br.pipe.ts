import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatBr'
})
export class NumberFormatBrPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return new Intl.NumberFormat('pt-BR').format(value);
  }
}
