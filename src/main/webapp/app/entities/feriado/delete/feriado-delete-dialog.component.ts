import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFeriado } from '../feriado.model';
import { FeriadoService } from '../service/feriado.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './feriado-delete-dialog.component.html',
})
export class FeriadoDeleteDialogComponent {
  feriado?: IFeriado;

  constructor(protected feriadoService: FeriadoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.feriadoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
