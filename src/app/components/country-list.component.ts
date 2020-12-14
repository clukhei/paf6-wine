import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  constructor(private wineSrv: WineService, private router: Router) {
 
  }
  countryList: [] = []
  ngOnInit(): void {


    this.wineSrv.fetchCountryList()
    .then(result=> this.countryList = result)

  }

  go(country) {
    console.log(country)
    this.router.navigate([`/wine/${country}`])
  }

}
