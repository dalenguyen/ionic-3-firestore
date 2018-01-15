import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageDocumentPage } from './manage-document';

@NgModule({
  declarations: [
    ManageDocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageDocumentPage),
  ],
})
export class ManageDocumentPageModule {}
