import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPessoaJuridica } from '../pessoa-juridica.model';
import { PessoaJuridicaService } from '../service/pessoa-juridica.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './pessoa-juridica-delete-dialog.component.html',
})
export class PessoaJuridicaDeleteDialogComponent {
  pessoaJuridica?: IPessoaJuridica;

  constructor(protected pessoaJuridicaService: PessoaJuridicaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pessoaJuridicaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
