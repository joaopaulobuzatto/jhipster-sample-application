import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAparelho } from '../aparelho.model';
import { AparelhoService } from '../service/aparelho.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './aparelho-delete-dialog.component.html',
})
export class AparelhoDeleteDialogComponent {
  aparelho?: IAparelho;

  constructor(protected aparelhoService: AparelhoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aparelhoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
