import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { VehicleInsuranceComponent } from './components/vehicle-insurance/vehicle-insurance.component';
import { CareerComponent } from './components/career/career.component';
import { CareerDetailComponent } from './components/career-detail/career-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { PlansComponent } from './components/plans/plans.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HealthInsuranceComponent } from './components/health-insurance/health-insurance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsedCarsComponent } from './components/used-cars/used-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ProductsComponent,
    VehicleInsuranceComponent,
    CareerComponent,
    CareerDetailComponent,
    BlogComponent,
    BlogDetailComponent,
    PlansComponent,
    NavbarComponent,
    HealthInsuranceComponent,
    FooterComponent,
    UsedCarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ShareModule,
    ShareButtonsModule,
    ShareButtonModule,
    ShareIconsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
