import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './components/country-list.component';
import { CountryWineDetailsComponent } from './components/country-wine-details.component';

const routes: Routes = [
  {path: '', component: CountryListComponent},
  {path: 'wine/:country', component: CountryWineDetailsComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
