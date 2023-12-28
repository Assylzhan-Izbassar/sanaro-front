import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { CallRequestDialogComponent } from './call-request-dialog/call-request-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { GreetingDialogComponent } from './greeting-dialog/greeting-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CertificatesComponent } from './certificates/certificates.component';

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
    CallRequestDialogComponent,
    RegisterDialogComponent,
    GreetingDialogComponent,
    ConfirmDialogComponent,
    CertificatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    AuthService,
    DialogService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
