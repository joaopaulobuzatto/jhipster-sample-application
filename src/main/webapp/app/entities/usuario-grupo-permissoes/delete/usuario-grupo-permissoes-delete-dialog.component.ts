import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';
import { UsuarioGrupoPermissoesService } from '../service/usuario-grupo-permissoes.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './usuario-grupo-permissoes-delete-dialog.component.html',
})
export class UsuarioGrupoPermissoesDeleteDialogComponent {
  usuarioGrupoPermissoes?: IUsuarioGrupoPermissoes;

  constructor(protected usuarioGrupoPermissoesService: UsuarioGrupoPermissoesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuarioGrupoPermissoesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
