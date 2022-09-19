import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';
import { DetentorAnexoArquivoService } from '../service/detentor-anexo-arquivo.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './detentor-anexo-arquivo-delete-dialog.component.html',
})
export class DetentorAnexoArquivoDeleteDialogComponent {
  detentorAnexoArquivo?: IDetentorAnexoArquivo;

  constructor(protected detentorAnexoArquivoService: DetentorAnexoArquivoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detentorAnexoArquivoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
