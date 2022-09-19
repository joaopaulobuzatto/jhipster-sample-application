import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOperadora } from '../operadora.model';
import { OperadoraService } from '../service/operadora.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './operadora-delete-dialog.component.html',
})
export class OperadoraDeleteDialogComponent {
  operadora?: IOperadora;

  constructor(protected operadoraService: OperadoraService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.operadoraService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
