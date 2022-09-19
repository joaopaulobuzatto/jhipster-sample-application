import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FeriadoComponent } from '../list/feriado.component';
import { FeriadoDetailComponent } from '../detail/feriado-detail.component';
import { FeriadoUpdateComponent } from '../update/feriado-update.component';
import { FeriadoRoutingResolveService } from './feriado-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const feriadoRoute: Routes = [
  {
    path: '',
    component: FeriadoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FeriadoDetailComponent,
    resolve: {
      feriado: FeriadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FeriadoUpdateComponent,
    resolve: {
      feriado: FeriadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FeriadoUpdateComponent,
    resolve: {
      feriado: FeriadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(feriadoRoute)],
  exports: [RouterModule],
})
export class FeriadoRoutingModule {}
