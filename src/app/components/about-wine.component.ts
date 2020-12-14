import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Wine } from '../wine.models';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-about-wine',
  templateUrl: './about-wine.component.html',
  styleUrls: ['./about-wine.component.css']
})
export class AboutWineComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private wineSvc: WineService) { }
  wineId : string
  wine= []
  ngOnInit(): void {
    this.wineId = this.activatedRoute.snapshot.params['id']
    console.log(this.wineId)
    this.wineSvc.fetchAboutWine(this.wineId)
      .then(res=> {
        console.log(res)
        this.wine = res
      })
      .catch(err=> console.log(err))
  }

}
