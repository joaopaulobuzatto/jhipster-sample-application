import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ArrCepComponent } from './list/arr-cep.component';
import { ArrCepDetailComponent } from './detail/arr-cep-detail.component';
import { ArrCepUpdateComponent } from './update/arr-cep-update.component';
import { ArrCepDeleteDialogComponent } from './delete/arr-cep-delete-dialog.component';
import { ArrCepRoutingModule } from './route/arr-cep-routing.module';

@NgModule({
  imports: [SharedModule, ArrCepRoutingModule],
  declarations: [ArrCepComponent, ArrCepDetailComponent, ArrCepUpdateComponent, ArrCepDeleteDialogComponent],
})
export class ArrCepModule {}
