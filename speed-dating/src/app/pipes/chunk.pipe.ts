import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {
  transform(array: any[], chunkSize: number): any[][] {
    const chunkedArrays = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArrays.push(array.slice(i, i + chunkSize));
    }
    return chunkedArrays;
  }
}

