import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrigemComponent } from './list/origem.component';
import { OrigemDetailComponent } from './detail/origem-detail.component';
import { OrigemUpdateComponent } from './update/origem-update.component';
import { OrigemDeleteDialogComponent } from './delete/origem-delete-dialog.component';
import { OrigemRoutingModule } from './route/origem-routing.module';

@NgModule({
  imports: [SharedModule, OrigemRoutingModule],
  declarations: [OrigemComponent, OrigemDetailComponent, OrigemUpdateComponent, OrigemDeleteDialogComponent],
})
export class OrigemModule {}
