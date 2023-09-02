import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth/auth.service';
import { DialogService } from './services/dialog/dialog.service';
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
import { FooterComponent } from './footer/footer.component';
import { NotifyDialogComponent } from './notify-dialog/notify-dialog.component';
import { CookieService } from 'ngx-cookie-service';

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
    FooterComponent,
    QuestionnaireDialogComponent,
    NotifyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    DialogService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
