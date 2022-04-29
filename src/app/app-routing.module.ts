import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { CareerDetailComponent } from './components/career-detail/career-detail.component';
import { CareerComponent } from './components/career/career.component';
import { ContactComponent } from './components/contact/contact.component';
import { HealthInsuranceComponent } from './components/health-insurance/health-insurance.component';
import { HomeComponent } from './components/home/home.component';
import { PlansComponent } from './components/plans/plans.component';
import { ProductsComponent } from './components/products/products.component';
import { UsedCarsComponent } from './components/used-cars/used-cars.component';
import { VehicleInsuranceComponent } from './components/vehicle-insurance/vehicle-insurance.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/blog-detail/:id', component: BlogDetailComponent },
  { path: 'blog-detail/:id', component: BlogDetailComponent },
  { path: 'blog-detail/:id', component: BlogDetailComponent },
  { path: 'career', component: CareerComponent },
  { path: 'career/career-detail/:id', component: CareerDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'vehicle-insurance', component: VehicleInsuranceComponent },
  { path: 'health-insurance', component: HealthInsuranceComponent },
  { path: 'used-cars', component: UsedCarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
