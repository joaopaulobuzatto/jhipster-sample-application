import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LicencaComponent } from '../list/licenca.component';
import { LicencaDetailComponent } from '../detail/licenca-detail.component';
import { LicencaUpdateComponent } from '../update/licenca-update.component';
import { LicencaRoutingResolveService } from './licenca-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const licencaRoute: Routes = [
  {
    path: '',
    component: LicencaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LicencaDetailComponent,
    resolve: {
      licenca: LicencaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LicencaUpdateComponent,
    resolve: {
      licenca: LicencaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LicencaUpdateComponent,
    resolve: {
      licenca: LicencaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(licencaRoute)],
  exports: [RouterModule],
})
export class LicencaRoutingModule {}
