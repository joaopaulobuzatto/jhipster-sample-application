import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';
import { TipoDeDocumentoAnexavelService } from '../service/tipo-de-documento-anexavel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './tipo-de-documento-anexavel-delete-dialog.component.html',
})
export class TipoDeDocumentoAnexavelDeleteDialogComponent {
  tipoDeDocumentoAnexavel?: ITipoDeDocumentoAnexavel;

  constructor(protected tipoDeDocumentoAnexavelService: TipoDeDocumentoAnexavelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDeDocumentoAnexavelService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
