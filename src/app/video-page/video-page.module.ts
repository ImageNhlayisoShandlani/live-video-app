import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPagePageRoutingModule } from './video-page-routing.module';

import { VideoPagePage } from './video-page.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VideoPagePageRoutingModule],
  declarations: [VideoPagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VideoPagePageModule {}
