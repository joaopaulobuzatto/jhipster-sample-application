import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AparelhoComponent } from './list/aparelho.component';
import { AparelhoDetailComponent } from './detail/aparelho-detail.component';
import { AparelhoUpdateComponent } from './update/aparelho-update.component';
import { AparelhoDeleteDialogComponent } from './delete/aparelho-delete-dialog.component';
import { AparelhoRoutingModule } from './route/aparelho-routing.module';

@NgModule({
  imports: [SharedModule, AparelhoRoutingModule],
  declarations: [AparelhoComponent, AparelhoDetailComponent, AparelhoUpdateComponent, AparelhoDeleteDialogComponent],
})
export class AparelhoModule {}
