/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { SalespersonFormComponent } from 'src/app/shared/components/salesperson-form/salesperson-form.component';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormDialogConfig } from '../../dialogs/data-manager-form-dialog/DataManagerFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
import { SalespersonManagerService } from './salesperson-manager.service';

@Component({
  selector: 'app-salesperson-manager',
  templateUrl: './salesperson-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './salesperson-manager.component.css'
  ]
})
export class SalespersonManagerComponent
  extends TransactionalDataManagerComponentDirective<Salesperson>
  implements OnInit {

  tableColumns: string[] = [ 'name', 'idNumber', 'actions' ];

  constructor(
    protected service: SalespersonManagerService,
    protected dialogService: MatDialog,
    private snackBarService: MatSnackBar,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    super.init(this.service);
    this.route.data.subscribe(
      d => {
        this.service.updateAccess(d.access);
        this.service.reloadItems();
      }
    );
  }

  protected createDialogProperties(item: Salesperson): DataManagerFormDialogConfig<Salesperson> {
    return {
      data: {
        item,
        formComponent: SalespersonFormComponent,
        service: this.service.dataService
      },
      width: '40rem'
    };
  }

  onClickDelete(e: Salesperson) {
    this.service.removeItems([e]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          this.snackBarService.open(`Empleado ${e.person.firstName} ${e.person.lastName} eliminado.`, 'OK');
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
        }
      },
      error => {
        this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
      }
    );
  }

}
