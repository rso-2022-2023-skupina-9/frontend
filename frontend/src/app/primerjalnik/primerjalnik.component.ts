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

  public updateIzdelekModal: boolean = false;
  public currentUpdateIzdelek: Izdelek | null = null;

  public novIzdelekForm = new FormGroup({
    vrsta: new FormControl('', [ Validators.required ]),
    trgovina: new FormControl('', [ Validators.required ]),
    ime: new FormControl('', [ Validators.required ]),
    cena: new FormControl('', [ Validators.required ])
  })

  public urediIzdelekForm = new FormGroup({
    vrsta: new FormControl(this.currentUpdateIzdelek?.vrsta_id),
    trgovina: new FormControl(this.currentUpdateIzdelek?.trgovina_id),
    ime: new FormControl(this.currentUpdateIzdelek?.ime),
    cena: new FormControl(this.currentUpdateIzdelek?.cena)
  })

  private pridobiIzdelke = () => {
    this.izdelkiMessage = "Pridobivam izdelke...";
    this.storitevZaIzdelke.pridobiIzdelke().subscribe((pridobljeniIzdelki) => {
      this.izdelkiMessage = "";
      this.izdelki = pridobljeniIzdelki;
    })
  }

  private pridobiVrste = () => {
    this.vrsteMessage = "Pridobivam vrste...";
    this.storitevZaIzdelke.pridobiVrste().subscribe((pridobljeneVrste) => {
      this.vrsteMessage = "";
      this.vrste = pridobljeneVrste;
    })
  }

  private pridobiTrgovine = () => {
    this.trgovineMessage = "Pridobivam trgovine...";
    this.storitevZaIzdelke.pridobiTrgovine().subscribe((pridobljeneTrgovine) => {
      this.trgovineMessage = "";
      this.trgovine = pridobljeneTrgovine;
    })
  }

  public dodajIzdelek = () => {
    console.log("Dodajam izdelek...", this.novIzdelekForm.value)
    this.modalStatus = false;
    let novIzdelek = new Izdelek();
    if (typeof(this.novIzdelekForm.value['trgovina']) == 'number') {
      novIzdelek.trgovina_id = this.novIzdelekForm.value['trgovina'];
    } else {
      this.izdelkiMessage = "Trgovina ni pravilna..."
    }
    if (typeof(this.novIzdelekForm.value['vrsta']) == 'number') {
      novIzdelek.vrsta_id = this.novIzdelekForm.value['vrsta'];
    } else {
      this.izdelkiMessage = "Vrsta izdelka ni pravilna..."
    }  
    if (typeof(this.novIzdelekForm.value['ime']) == 'string') {
      novIzdelek.ime = this.novIzdelekForm.value['ime'];
    } else {
      this.izdelkiMessage = "Ime izdelka ni pravilno..."
    }
    if (typeof(this.novIzdelekForm.value['cena']) == 'number') {
      novIzdelek.cena = this.novIzdelekForm.value['cena'];
    } else {
      this.izdelkiMessage = "Cena izdelka ni pravilna..."
    }
    this.storitevZaIzdelke.dodajIzdelek(novIzdelek).subscribe((dodanIzdelek) => {
      this.izdelki.push(dodanIzdelek)
    })
  }

  public beginIzdelekUpdate = (izdelek: Izdelek) => {
    this.currentUpdateIzdelek = izdelek;
    this.updateIzdelekModal = true;
    this.urediIzdelekForm.controls['trgovina'].setValue(izdelek.trgovina_id);
    this.urediIzdelekForm.controls['vrsta'].setValue(izdelek.vrsta_id);
    this.urediIzdelekForm.controls['ime'].setValue(izdelek.ime);
    this.urediIzdelekForm.controls['cena'].setValue(izdelek.cena)
  }

  public urediIzdelek = () => {
    console.log("Urejam izdelek:", this.currentUpdateIzdelek);
    this.updateIzdelekModal = false;
    let updatedIzdelek = new Izdelek();
    if (this.currentUpdateIzdelek?.izdelek_id) {
      updatedIzdelek.izdelek_id = this.currentUpdateIzdelek?.izdelek_id;
    } else {
      this.izdelkiMessage = "Izdelka ni mogoce urediti..."
      return
    }
    if (typeof(this.urediIzdelekForm.value['trgovina']) == 'number') {
      updatedIzdelek.trgovina_id = this.urediIzdelekForm.value['trgovina'];
    } else {
      this.izdelkiMessage = "Trgovina ni pravilna..."
      return
    }
    if (typeof(this.urediIzdelekForm.value['vrsta']) == 'number') {
      updatedIzdelek.vrsta_id = this.urediIzdelekForm.value['vrsta'];
    } else {
      this.izdelkiMessage = "Vrsta izdelka ni pravilna..."
      return
    }
    if (typeof(this.urediIzdelekForm.value['ime']) == 'string') {
      updatedIzdelek.ime = this.urediIzdelekForm.value['ime'];
    } else {
      this.izdelkiMessage = "Ime izdelka ni pravilno..."
      return
    }
    if (typeof(this.urediIzdelekForm.value['cena']) == 'number') {
      updatedIzdelek.cena = this.urediIzdelekForm.value['cena'];
    } else {
      this.izdelkiMessage = "Cena izdelka ni pravilna..."
      return
    }
    this.storitevZaIzdelke.urediIzdelek(updatedIzdelek).subscribe((urejenIzdelek) => {
      if (this.currentUpdateIzdelek != null) {
        let index = this.izdelki.indexOf(this.currentUpdateIzdelek);
        console.log(urejenIzdelek);
        this.izdelki[index] = urejenIzdelek;
      }
    })
  }

  public izbrisiIzdelek = (izdelek: Izdelek) => {
    console.log("Brisem izdelek:", izdelek);
    this.storitevZaIzdelke.izbrisiIzdelek(izdelek.izdelek_id).subscribe((response) => {
      console.log(response)
      if (response.status === 204) {
        let index = this.izdelki.indexOf(izdelek);
        this.izdelki.splice(index, 1)
      } else {
        this.izdelkiMessage = "Izdelka ni bilo mogoce izbrisati!"
      }
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
