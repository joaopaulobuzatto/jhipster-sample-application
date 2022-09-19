import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnexoArquivo } from '../anexo-arquivo.model';
import { AnexoArquivoService } from '../service/anexo-arquivo.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './anexo-arquivo-delete-dialog.component.html',
})
export class AnexoArquivoDeleteDialogComponent {
  anexoArquivo?: IAnexoArquivo;

  constructor(protected anexoArquivoService: AnexoArquivoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.anexoArquivoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
