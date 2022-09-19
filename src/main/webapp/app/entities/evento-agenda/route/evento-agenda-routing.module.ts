import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EventoAgendaComponent } from '../list/evento-agenda.component';
import { EventoAgendaDetailComponent } from '../detail/evento-agenda-detail.component';
import { EventoAgendaUpdateComponent } from '../update/evento-agenda-update.component';
import { EventoAgendaRoutingResolveService } from './evento-agenda-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const eventoAgendaRoute: Routes = [
  {
    path: '',
    component: EventoAgendaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EventoAgendaDetailComponent,
    resolve: {
      eventoAgenda: EventoAgendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EventoAgendaUpdateComponent,
    resolve: {
      eventoAgenda: EventoAgendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EventoAgendaUpdateComponent,
    resolve: {
      eventoAgenda: EventoAgendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(eventoAgendaRoute)],
  exports: [RouterModule],
})
export class EventoAgendaRoutingModule {}
