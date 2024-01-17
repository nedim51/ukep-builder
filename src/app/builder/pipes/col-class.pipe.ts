import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colClass'
})
export class ColClassPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
