import { Component, OnInit } from '@angular/core';
import { Izdelek } from '../izdelek';
import { StoritevZaIzdelkeService } from '../storitev-za-izdelke.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vrsta } from '../vrsta';
import { Trgovina } from '../trgovina';

@Component({
  selector: 'app-primerjalnik',
  templateUrl: './primerjalnik.component.html',
  styleUrls: ['./primerjalnik.component.css']
})
export class PrimerjalnikComponent implements OnInit {

  constructor(private storitevZaIzdelke: StoritevZaIzdelkeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pridobiIzdelke();
    this.pridobiVrste();
    this.pridobiTrgovine();
  }

  public izdelki: Izdelek[] = [];
  public vrste: Vrsta[] = [];
  public trgovine: Trgovina[] = [];
  public vrsteMessage: string = "";
  public trgovineMessage: string = "";
  public izdelkiMessage: string = "";
  public modalStatus: boolean = false;

  private pridobiIzdelke = () => {
    this.izdelkiMessage = "Pridobivam izdelke...";
    this.storitevZaIzdelke.pridobiIzdelke().subscribe((pridobljeniIzdelki) => {
      this.izdelkiMessage = "";
      this.izdelki = pridobljeniIzdelki;
      console.log(this.izdelki)
    })
  }

  private pridobiVrste = () => {
    this.vrsteMessage = "Pridobivam vrste...";
    this.storitevZaIzdelke.pridobiVrste().subscribe((pridobljeneVrste) => {
      this.vrsteMessage = "";
      this.vrste = pridobljeneVrste;
      console.log(this.vrste);
    })
  }

  private pridobiTrgovine = () => {
    this.trgovineMessage = "Pridobivam trgovine...";
    this.storitevZaIzdelke.pridobiTrgovine().subscribe((pridobljeneTrgovine) => {
      this.trgovineMessage = "";
      this.trgovine = pridobljeneTrgovine;
      console.log(this.trgovine);
    })
  }

  public izbrisiTrgovino = (trgovina: Trgovina) => {
    console.log("Brisem trgovino:", trgovina);
    this.storitevZaIzdelke.izbrisiTrgovino(trgovina.trgovina_id).subscribe((response) => {
      console.log(response)
      if (response.status === 204) {
        let index = this.trgovine.indexOf(trgovina);
        this.trgovine.splice(index, 1)
        return
      }
    })
    this.trgovineMessage = "Trgovine ni bilo mogoce izbrisati"
  }

  public izbrisiVrsto = (vrsta: Vrsta) => {
    console.log("Brisem vrsto:", vrsta);
    this.storitevZaIzdelke.izbrisiVrsto(vrsta.vrsta_id).subscribe((response) => {
      if (response.status === 204) {
        let index = this.vrste.indexOf(vrsta);
        this.vrste.splice(index, 1)
        return
      }
    })
    this.vrsteMessage = "Vrste ni bilo mogoce izbrisati"
  }

}
