import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth/auth.service';
import { DialogService } from './services/dialog/dialog.service';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './pages/hero/hero.component';
import { InnovationComponent } from './pages/innovation/innovation.component';
import { FeaturesComponent } from './pages/features/features.component';
import { SetsComponent } from './pages/sets/sets.component';
import { AuthDialogComponent } from './pages/auth-dialog/auth-dialog.component';
import { QuestionnaireDialogComponent } from './pages/questionnaire-dialog/questionnaire-dialog.component';
import { NumbersComponent } from './pages/numbers/numbers.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { HandleObjComponent } from './pages/handle-obj/handle-obj.component';
import { LastCallComponent } from './pages/last-call/last-call.component';
import { FooterComponent } from './footer/footer.component';
import { NotifyDialogComponent } from './pages/notify-dialog/notify-dialog.component';
import { CallRequestDialogComponent } from './pages/call-request-dialog/call-request-dialog.component';
import { RegisterDialogComponent } from './pages/register-dialog/register-dialog.component';
import { GreetingDialogComponent } from './pages/greeting-dialog/greeting-dialog.component';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { MainComponent } from './pages/main/main.component';
import { QuizComponent } from './pages/quiz/quiz.component';


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
    ThankYouComponent,
    MainComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
