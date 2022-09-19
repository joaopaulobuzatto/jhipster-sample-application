import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IIpLiberado } from '../ip-liberado.model';
import { IpLiberadoService } from '../service/ip-liberado.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ip-liberado-delete-dialog.component.html',
})
export class IpLiberadoDeleteDialogComponent {
  ipLiberado?: IIpLiberado;

  constructor(protected ipLiberadoService: IpLiberadoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ipLiberadoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
