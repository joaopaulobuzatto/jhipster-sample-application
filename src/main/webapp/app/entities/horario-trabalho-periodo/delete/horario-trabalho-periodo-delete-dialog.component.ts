import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';
import { HorarioTrabalhoPeriodoService } from '../service/horario-trabalho-periodo.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './horario-trabalho-periodo-delete-dialog.component.html',
})
export class HorarioTrabalhoPeriodoDeleteDialogComponent {
  horarioTrabalhoPeriodo?: IHorarioTrabalhoPeriodo;

  constructor(protected horarioTrabalhoPeriodoService: HorarioTrabalhoPeriodoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horarioTrabalhoPeriodoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
