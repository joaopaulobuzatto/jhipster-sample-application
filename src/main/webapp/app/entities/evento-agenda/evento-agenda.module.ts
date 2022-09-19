import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EventoAgendaComponent } from './list/evento-agenda.component';
import { EventoAgendaDetailComponent } from './detail/evento-agenda-detail.component';
import { EventoAgendaUpdateComponent } from './update/evento-agenda-update.component';
import { EventoAgendaDeleteDialogComponent } from './delete/evento-agenda-delete-dialog.component';
import { EventoAgendaRoutingModule } from './route/evento-agenda-routing.module';

@NgModule({
  imports: [SharedModule, EventoAgendaRoutingModule],
  declarations: [EventoAgendaComponent, EventoAgendaDetailComponent, EventoAgendaUpdateComponent, EventoAgendaDeleteDialogComponent],
})
export class EventoAgendaModule {}
