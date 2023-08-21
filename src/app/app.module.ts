import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { InnovationComponent } from './innovation/innovation.component';
import { FeaturesComponent } from './features/features.component';
import { SetsComponent } from './sets/sets.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { QuestionnaireDialogComponent } from './questionnaire-dialog/questionnaire-dialog.component';
import { NumbersComponent } from './numbers/numbers.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HandleObjComponent } from './handle-obj/handle-obj.component';
import { LastCallComponent } from './last-call/last-call.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    InnovationComponent,
    FeaturesComponent,
    SetsComponent,
    AuthDialogComponent,
    QuestionnaireDialogComponent,
    NumbersComponent,
    TestimonialsComponent,
    HandleObjComponent,
    LastCallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [AuthService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
