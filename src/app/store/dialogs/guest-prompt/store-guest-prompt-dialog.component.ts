/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreGuestPromptDialogOptions } from './StoreGuestPromptDialogOptions';

@Component({
  selector: 'app-store-guest-prompt-dialog',
  templateUrl: './store-guest-prompt-dialog.component.html',
  styleUrls: ['./store-guest-prompt-dialog.component.css']
})
export class StoreGuestPromptDialogComponent {

  constructor(
    private dialog: MatDialogRef<StoreGuestPromptDialogComponent>
  ) { }

  onClickOption(n: string): void {
    if (n in StoreGuestPromptDialogOptions) {
      this.dialog.close(StoreGuestPromptDialogOptions[n]);
    } else {
      this.dialog.close();
    }
  }

}
