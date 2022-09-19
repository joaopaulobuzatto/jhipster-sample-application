import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LicencaComponent } from './list/licenca.component';
import { LicencaDetailComponent } from './detail/licenca-detail.component';
import { LicencaUpdateComponent } from './update/licenca-update.component';
import { LicencaDeleteDialogComponent } from './delete/licenca-delete-dialog.component';
import { LicencaRoutingModule } from './route/licenca-routing.module';

@NgModule({
  imports: [SharedModule, LicencaRoutingModule],
  declarations: [LicencaComponent, LicencaDetailComponent, LicencaUpdateComponent, LicencaDeleteDialogComponent],
})
export class LicencaModule {}
