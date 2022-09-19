import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HorarioTrabalhoPeriodoComponent } from '../list/horario-trabalho-periodo.component';
import { HorarioTrabalhoPeriodoDetailComponent } from '../detail/horario-trabalho-periodo-detail.component';
import { HorarioTrabalhoPeriodoUpdateComponent } from '../update/horario-trabalho-periodo-update.component';
import { HorarioTrabalhoPeriodoRoutingResolveService } from './horario-trabalho-periodo-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const horarioTrabalhoPeriodoRoute: Routes = [
  {
    path: '',
    component: HorarioTrabalhoPeriodoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HorarioTrabalhoPeriodoDetailComponent,
    resolve: {
      horarioTrabalhoPeriodo: HorarioTrabalhoPeriodoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HorarioTrabalhoPeriodoUpdateComponent,
    resolve: {
      horarioTrabalhoPeriodo: HorarioTrabalhoPeriodoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HorarioTrabalhoPeriodoUpdateComponent,
    resolve: {
      horarioTrabalhoPeriodo: HorarioTrabalhoPeriodoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(horarioTrabalhoPeriodoRoute)],
  exports: [RouterModule],
})
export class HorarioTrabalhoPeriodoRoutingModule {}
