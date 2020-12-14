import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WineDetail } from '../wine.models'
import { WineService } from '../wine.service';

@Component({
  selector: 'app-country-wine-details',
  templateUrl: './country-wine-details.component.html',
  styleUrls: ['./country-wine-details.component.css']
})
export class CountryWineDetailsComponent implements OnInit {

  wineDetails: WineDetail[] = []
  constructor(private wineSvc: WineService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const country = this.activatedRoute.snapshot.params['country']
    console.log(country)
    this.wineSvc.fetchWineDetails(country)
      .then(res=> {
        this.wineDetails = res
      })
  }

  go(wineId: string){
    this.router.navigate([`/wine/about/${wineId}`])
  } 
}
