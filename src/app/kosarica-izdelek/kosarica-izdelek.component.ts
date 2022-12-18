import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Izdelek } from '../izdelek';
import { Kosarica } from '../kosarica';
import { StoritevZaKosariceService } from '../storitev-za-kosarice.service';

@Component({
  selector: 'app-kosarica-izdelek',
  templateUrl: './kosarica-izdelek.component.html',
  styleUrls: ['./kosarica-izdelek.component.css']
})
export class KosaricaIzdelekComponent implements OnInit {
  public kosarica: null | Kosarica = null;
  public id: number = -1;

  constructor(private storitevZaKosarice: StoritevZaKosariceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })
    this.pridobiKosarico(this.id);
  }

  private pridobiKosarico = (id: number) => {
    this.storitevZaKosarice.pridobiKosarico(id).subscribe((pridobljenaKosarica) => {
      this.kosarica = pridobljenaKosarica
    })
  }

  public odstraniIzKosarice = (izdelek: Izdelek) => {
    if (this.kosarica) {
      this.storitevZaKosarice.odstraniIzdelekIzKosarice(this.kosarica.kosarica_id, izdelek.izdelek_id).subscribe((kosarica) => {
        console.log("Izdelek uspesno odstranjen iz kosarice!")
        this.pridobiKosarico(this.id);
      })
    }
  }

}
