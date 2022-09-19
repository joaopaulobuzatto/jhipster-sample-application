import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarioIpLiberado } from '../usuario-ip-liberado.model';
import { UsuarioIpLiberadoService } from '../service/usuario-ip-liberado.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './usuario-ip-liberado-delete-dialog.component.html',
})
export class UsuarioIpLiberadoDeleteDialogComponent {
  usuarioIpLiberado?: IUsuarioIpLiberado;

  constructor(protected usuarioIpLiberadoService: UsuarioIpLiberadoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuarioIpLiberadoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
