import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OperadoraComponent } from './list/operadora.component';
import { OperadoraDetailComponent } from './detail/operadora-detail.component';
import { OperadoraUpdateComponent } from './update/operadora-update.component';
import { OperadoraDeleteDialogComponent } from './delete/operadora-delete-dialog.component';
import { OperadoraRoutingModule } from './route/operadora-routing.module';

@NgModule({
  imports: [SharedModule, OperadoraRoutingModule],
  declarations: [OperadoraComponent, OperadoraDetailComponent, OperadoraUpdateComponent, OperadoraDeleteDialogComponent],
})
export class OperadoraModule {}
