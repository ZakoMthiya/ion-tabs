import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { LogoComponent } from './logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FeedUpdateComponent } from './feed-update/feed-update.component';
import { TimeagoComponent } from './timeago/timeago.component';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';


@NgModule({
  declarations: [
    SlidesComponent,
    StartComponent,
    LogoComponent,
    FeedCardComponent,
    FeedUpdateComponent,
    TimeagoComponent,
    TimeAgoPipe
  ],
  exports:[
    SlidesComponent,
    StartComponent,
    LogoComponent,
    FeedCardComponent,
    FeedUpdateComponent,
    TimeagoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
