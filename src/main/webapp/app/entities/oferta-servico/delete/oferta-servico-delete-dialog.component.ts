import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOfertaServico } from '../oferta-servico.model';
import { OfertaServicoService } from '../service/oferta-servico.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './oferta-servico-delete-dialog.component.html',
})
export class OfertaServicoDeleteDialogComponent {
  ofertaServico?: IOfertaServico;

  constructor(protected ofertaServicoService: OfertaServicoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ofertaServicoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
