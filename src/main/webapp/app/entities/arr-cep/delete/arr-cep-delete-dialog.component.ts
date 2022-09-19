import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IArrCep } from '../arr-cep.model';
import { ArrCepService } from '../service/arr-cep.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './arr-cep-delete-dialog.component.html',
})
export class ArrCepDeleteDialogComponent {
  arrCep?: IArrCep;

  constructor(protected arrCepService: ArrCepService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.arrCepService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
