/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { DataPage } from '../models/DataPage';

export interface ICategoriesPublicApiService {
  fetchChildrenProductCategoriesByParentCode(parentCode: number): Observable<DataPage<ProductCategory>>;
  fetchRootProductCategories(): Observable<DataPage<ProductCategory>>;
}
