import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoDeDocumentoAnexavelComponent } from './list/tipo-de-documento-anexavel.component';
import { TipoDeDocumentoAnexavelDetailComponent } from './detail/tipo-de-documento-anexavel-detail.component';
import { TipoDeDocumentoAnexavelUpdateComponent } from './update/tipo-de-documento-anexavel-update.component';
import { TipoDeDocumentoAnexavelDeleteDialogComponent } from './delete/tipo-de-documento-anexavel-delete-dialog.component';
import { TipoDeDocumentoAnexavelRoutingModule } from './route/tipo-de-documento-anexavel-routing.module';

@NgModule({
  imports: [SharedModule, TipoDeDocumentoAnexavelRoutingModule],
  declarations: [
    TipoDeDocumentoAnexavelComponent,
    TipoDeDocumentoAnexavelDetailComponent,
    TipoDeDocumentoAnexavelUpdateComponent,
    TipoDeDocumentoAnexavelDeleteDialogComponent,
  ],
})
export class TipoDeDocumentoAnexavelModule {}
