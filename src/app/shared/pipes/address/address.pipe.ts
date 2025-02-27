/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/models/entities/Address';

@Pipe({ name: 'address' })
export class AddressPipe
  implements PipeTransform {

  transform(value: Address, ...args: unknown[]): unknown {
    return (value.firstLine
      + (value.secondLine ? ', ' + value.secondLine : '')
      + ', ' + value.city
      + ', ' + value.municipality
      + (value.notes ? ' (Comentario: ' + value.notes + ')' : ''));
  }

}
