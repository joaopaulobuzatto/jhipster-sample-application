import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OfertaComponent } from './list/oferta.component';
import { OfertaDetailComponent } from './detail/oferta-detail.component';
import { OfertaUpdateComponent } from './update/oferta-update.component';
import { OfertaDeleteDialogComponent } from './delete/oferta-delete-dialog.component';
import { OfertaRoutingModule } from './route/oferta-routing.module';

@NgModule({
  imports: [SharedModule, OfertaRoutingModule],
  declarations: [OfertaComponent, OfertaDetailComponent, OfertaUpdateComponent, OfertaDeleteDialogComponent],
})
export class OfertaModule {}
