import { Component, OnInit } from '@angular/core';
import { Izdelek } from '../izdelek';
import { StoritevZaIzdelkeService } from '../storitev-za-izdelke.service';

@Component({
  selector: 'app-primerjalnik',
  templateUrl: './primerjalnik.component.html',
  styleUrls: ['./primerjalnik.component.css']
})
export class PrimerjalnikComponent implements OnInit {

  constructor(private storitevZaIzdelke: StoritevZaIzdelkeService) { }

  ngOnInit(): void {
    this.pridobiIzdelke();
  }

  public izdelki: Izdelek[] = [];
  public message: string = "";

  private pridobiIzdelke = () => {
    this.message = "Pridobivam izdelke...";
    this.storitevZaIzdelke.pridobiIzdelke().subscribe((pridobljeniIzdelki) => {
      this.message = "";
      this.izdelki = pridobljeniIzdelki;
    })
  }

}
