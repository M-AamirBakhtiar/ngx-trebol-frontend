/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class SalespeopleDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Salesperson>
  implements IEntityDataApiService<Salesperson> {

  constructor(http: HttpClient) {
    super(http, '/salespeople');
  }

  fetchExisting(salesperson: Partial<Salesperson>) {
    return this.http.get<Salesperson>(
      `${this.baseUrl}/${salesperson.person.idNumber}`
    );
  }

  update(salesperson: Partial<Salesperson>) {
    return this.http.put(
      `${this.baseUrl}/${salesperson.person.idNumber}`,
      salesperson
    );
  }

  delete(salesperson: Partial<Salesperson>) {
    return this.http.delete(
      `${this.baseUrl}/${salesperson.person.idNumber}`
    );
  }
}
