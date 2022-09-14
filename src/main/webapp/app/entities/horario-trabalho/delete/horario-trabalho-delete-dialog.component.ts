import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioTrabalho } from '../horario-trabalho.model';
import { HorarioTrabalhoService } from '../service/horario-trabalho.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './horario-trabalho-delete-dialog.component.html',
})
export class HorarioTrabalhoDeleteDialogComponent {
  horarioTrabalho?: IHorarioTrabalho;

  constructor(protected horarioTrabalhoService: HorarioTrabalhoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horarioTrabalhoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
