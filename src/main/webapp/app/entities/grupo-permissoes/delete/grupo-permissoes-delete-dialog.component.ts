import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrupoPermissoes } from '../grupo-permissoes.model';
import { GrupoPermissoesService } from '../service/grupo-permissoes.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './grupo-permissoes-delete-dialog.component.html',
})
export class GrupoPermissoesDeleteDialogComponent {
  grupoPermissoes?: IGrupoPermissoes;

  constructor(protected grupoPermissoesService: GrupoPermissoesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupoPermissoesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
