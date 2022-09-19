import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OfertaServicoComponent } from './list/oferta-servico.component';
import { OfertaServicoDetailComponent } from './detail/oferta-servico-detail.component';
import { OfertaServicoUpdateComponent } from './update/oferta-servico-update.component';
import { OfertaServicoDeleteDialogComponent } from './delete/oferta-servico-delete-dialog.component';
import { OfertaServicoRoutingModule } from './route/oferta-servico-routing.module';

@NgModule({
  imports: [SharedModule, OfertaServicoRoutingModule],
  declarations: [OfertaServicoComponent, OfertaServicoDetailComponent, OfertaServicoUpdateComponent, OfertaServicoDeleteDialogComponent],
})
export class OfertaServicoModule {}
