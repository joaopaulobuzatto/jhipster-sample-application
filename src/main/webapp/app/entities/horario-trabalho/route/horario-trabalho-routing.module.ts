import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HorarioTrabalhoComponent } from '../list/horario-trabalho.component';
import { HorarioTrabalhoDetailComponent } from '../detail/horario-trabalho-detail.component';
import { HorarioTrabalhoUpdateComponent } from '../update/horario-trabalho-update.component';
import { HorarioTrabalhoRoutingResolveService } from './horario-trabalho-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const horarioTrabalhoRoute: Routes = [
  {
    path: '',
    component: HorarioTrabalhoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HorarioTrabalhoDetailComponent,
    resolve: {
      horarioTrabalho: HorarioTrabalhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HorarioTrabalhoUpdateComponent,
    resolve: {
      horarioTrabalho: HorarioTrabalhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HorarioTrabalhoUpdateComponent,
    resolve: {
      horarioTrabalho: HorarioTrabalhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(horarioTrabalhoRoute)],
  exports: [RouterModule],
})
export class HorarioTrabalhoRoutingModule {}
