import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPizzaPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value) {
      value = parseInt(value)
      if (isNaN(value))  throw new HttpException('Limite is must a number', HttpStatus.BAD_REQUEST)
    }
    return value;
  }
}
