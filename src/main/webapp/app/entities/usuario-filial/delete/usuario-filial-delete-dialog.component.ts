import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarioFilial } from '../usuario-filial.model';
import { UsuarioFilialService } from '../service/usuario-filial.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './usuario-filial-delete-dialog.component.html',
})
export class UsuarioFilialDeleteDialogComponent {
  usuarioFilial?: IUsuarioFilial;

  constructor(protected usuarioFilialService: UsuarioFilialService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuarioFilialService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
