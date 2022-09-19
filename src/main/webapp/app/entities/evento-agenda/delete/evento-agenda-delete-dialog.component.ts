import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEventoAgenda } from '../evento-agenda.model';
import { EventoAgendaService } from '../service/evento-agenda.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './evento-agenda-delete-dialog.component.html',
})
export class EventoAgendaDeleteDialogComponent {
  eventoAgenda?: IEventoAgenda;

  constructor(protected eventoAgendaService: EventoAgendaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eventoAgendaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
