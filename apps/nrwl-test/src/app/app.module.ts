import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { BackendService } from './backend.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppComponent, ListComponent, DetailsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ListComponent
      },
      {
        path: ':id',
        component: DetailsComponent
      },
      { path: '', component: ListComponent },
      { path: '**', component: ListComponent }
    ]),

    // Angular Material Modules
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {}
