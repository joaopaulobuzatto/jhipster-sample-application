import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOferta } from '../oferta.model';
import { OfertaService } from '../service/oferta.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './oferta-delete-dialog.component.html',
})
export class OfertaDeleteDialogComponent {
  oferta?: IOferta;

  constructor(protected ofertaService: OfertaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ofertaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
