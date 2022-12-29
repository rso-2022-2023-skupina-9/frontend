import { Component, OnInit } from '@angular/core';
import { StoritevZaIzdelkeService } from '../storitev-za-izdelke.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vrsta } from '../vrsta';
import { ActivatedRoute } from '@angular/router';
import { Izdelek } from '../izdelek';
import { Trgovina } from '../trgovina';
import { Kosarica } from '../kosarica';
import { StoritevZaKosariceService } from '../storitev-za-kosarice.service';
import { CurrencyRequest } from '../currency-request';
import { CurrencyResponse } from '../currency-response';

@Component({
  selector: 'app-primerjalnik-vrsta',
  templateUrl: './primerjalnik-vrsta.component.html',
  styleUrls: ['./primerjalnik-vrsta.component.css']
})
export class PrimerjalnikVrstaComponent implements OnInit {
  public vrsta: null | Vrsta = null;
  public id: number = 0;
  public vrsteMessage: string = "";
  public vrste: Vrsta[] = [];
  public trgovineMessage: string = "";
  public trgovine: Trgovina[] = [];
  public kosaricaModal: boolean = false;
  public kosarice: Kosarica[] = [];
  public selectedIzdelek: Izdelek | null = null;
  public pretvorbaModal: boolean = false;
  public zadnjaPretvorba: CurrencyResponse | null = null;

  constructor(private storitevZaIzdelke: StoritevZaIzdelkeService, private storitevZaKosarice: StoritevZaKosariceService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })
    this.pridobiVrsto(this.id)
    this.pridobiVrste();
    this.pridobiTrgovine();
    this.pridobiKosarice();
  }

  ngOnDestroy(): void {
    this.pridobiVrsto(this.id)
    this.pridobiVrste();
    this.pridobiTrgovine();
  }

  private pridobiVrsto = (id: number) => {
    this.storitevZaIzdelke.pridobiVrsto(id).subscribe((pridobljenaVrsta) => {
      this.vrsta = pridobljenaVrsta
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

  private pridobiKosarice = () => {
    this.storitevZaKosarice.pridobiKosarice().subscribe((pridobljeneKosarice) => {
      console.log(pridobljeneKosarice)
      this.kosarice = pridobljeneKosarice;
    })
  }

  public updateIzdelekModal: boolean = false;
  public currentUpdateIzdelek: Izdelek | null = null;
  public izdelkiMessage: string = "";
  public modalStatus: boolean = false;

  public novIzdelekForm = new FormGroup({
    vrsta: new FormControl(-1, [Validators.required]),
    trgovina: new FormControl(-1, [Validators.required]),
    ime: new FormControl('', [Validators.required]),
    cena: new FormControl('', [Validators.required])
  })

  public urediIzdelekForm = new FormGroup({
    vrsta: new FormControl(this.currentUpdateIzdelek?.vrsta.vrsta_id),
    trgovina: new FormControl(this.currentUpdateIzdelek?.trgovina.trgovina_id),
    ime: new FormControl(this.currentUpdateIzdelek?.ime),
    cena: new FormControl(this.currentUpdateIzdelek?.cena)
  })

  public dodajIzdelek = () => {
    console.log("Dodajam izdelek...", this.novIzdelekForm.value)
    this.modalStatus = false;
    let novIzdelek = new Izdelek();
    if (this.novIzdelekForm.value['trgovina']) {
      this.trgovine.forEach(trgovina => {
        if (this.novIzdelekForm.value['trgovina'] == trgovina.trgovina_id) {
          novIzdelek.trgovina = trgovina;
        }
      })
    } else {
      this.izdelkiMessage = "Trgovina ni pravilna..."
    }
    if (this.novIzdelekForm.value['vrsta']) {
      this.vrste.forEach(vrsta => {
        if (this.novIzdelekForm.value['vrsta'] == vrsta.vrsta_id) {
          novIzdelek.vrsta = vrsta
        }
      })
    } else {
      this.izdelkiMessage = "Vrsta izdelka ni pravilna..."
    }
    if (typeof (this.novIzdelekForm.value['ime']) == 'string') {
      novIzdelek.ime = this.novIzdelekForm.value['ime'];
    } else {
      this.izdelkiMessage = "Ime izdelka ni pravilno..."
    }
    if (typeof (this.novIzdelekForm.value['cena']) == 'number') {
      novIzdelek.cena = this.novIzdelekForm.value['cena'];
    } else {
      this.izdelkiMessage = "Cena izdelka ni pravilna..."
    }
    this.storitevZaIzdelke.dodajIzdelek(novIzdelek).subscribe((dodanIzdelek) => {
      this.vrsta?.izdelki?.push(dodanIzdelek)
      this.pridobiVrsto(this.id);
    })
  }

  public beginIzdelekUpdate = (izdelek: Izdelek) => {
    this.currentUpdateIzdelek = izdelek;
    this.updateIzdelekModal = true;
    this.urediIzdelekForm.controls['trgovina'].setValue(izdelek.trgovina.trgovina_id);
    this.urediIzdelekForm.controls['vrsta'].setValue(this.vrsta?.vrsta_id);
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
    if (this.urediIzdelekForm.value['trgovina']) {
      this.trgovine.forEach(trgovina => {
        if (this.urediIzdelekForm.value['trgovina'] == trgovina.trgovina_id) {
          updatedIzdelek.trgovina = trgovina
        }
      })
    } else {
      this.izdelkiMessage = "Trgovina ni pravilna..."
      return
    }
    if (this.urediIzdelekForm.value['vrsta']) {
      this.vrste.forEach(vrsta => {
        if (this.urediIzdelekForm.value['vrsta'] == vrsta.vrsta_id) {
          updatedIzdelek.vrsta = vrsta;
        }
      });
    } else {
      this.izdelkiMessage = "Vrsta izdelka ni pravilna..."
      return
    }
    if (typeof (this.urediIzdelekForm.value['ime']) == 'string') {
      updatedIzdelek.ime = this.urediIzdelekForm.value['ime'];
    } else {
      this.izdelkiMessage = "Ime izdelka ni pravilno..."
      return
    }
    if (typeof (this.urediIzdelekForm.value['cena']) == 'number') {
      updatedIzdelek.cena = this.urediIzdelekForm.value['cena'];
    } else {
      this.izdelkiMessage = "Cena izdelka ni pravilna..."
      return
    }
    this.storitevZaIzdelke.urediIzdelek(updatedIzdelek).subscribe((urejenIzdelek) => {
      if (this.currentUpdateIzdelek != null) {
        let index = this.vrsta?.izdelki?.indexOf(this.currentUpdateIzdelek);
        if (this.vrsta && this.vrsta.izdelki && index != undefined) {
          this.vrsta.izdelki[index] = urejenIzdelek;
          this.pridobiVrsto(this.id);
        }
      }
    })
  }

  public izbrisiIzdelek = (izdelek: Izdelek) => {
    console.log("Brisem izdelek:", izdelek);
    this.storitevZaIzdelke.izbrisiIzdelek(izdelek.izdelek_id).subscribe((response) => {
      console.log(response)
      if (response.status === 204) {
        let index = this.vrsta?.izdelki?.indexOf(izdelek);
        if (index != undefined) {
          this.vrsta?.izdelki?.splice(index, 1);
          this.pridobiVrsto(this.id);
        }
      } else {
        this.izdelkiMessage = "Izdelka ni bilo mogoce izbrisati!"
      }
    })
  }

  public dodajVKosaricoForm = new FormGroup({
    kosarica: new FormControl(null, Validators.required)
  })

  public dodajVKosarico = () => {
    console.log("Dodajanje v kosarico: ", this.dodajVKosaricoForm.value['kosarica'])
    this.kosaricaModal = false;
    let id = this.dodajVKosaricoForm.value['kosarica'];
    if (id && this.selectedIzdelek) {
      this.storitevZaKosarice.dodajIzdelekVKosarico(id, this.selectedIzdelek).subscribe((dodanIzdelek) => {
        console.log("Dodan izdelek: ", dodanIzdelek);
      })
    } else {
      console.log("Noben izdelek ni izbran!!!")
    }
  }

  public pretvoriUSD(izdelek: Izdelek) { 
    let currencyRequest: CurrencyRequest = new CurrencyRequest();
    currencyRequest.have = "EUR";
    currencyRequest.want = "USD";
    currencyRequest.amount = (izdelek.cena / 100);
    console.log("AMOUNT: ", currencyRequest.amount);
    this.storitevZaIzdelke.spremeniValuto(currencyRequest).subscribe((novaValuta) => {
      console.log(novaValuta);
      this.pretvorbaModal = true;
      this.zadnjaPretvorba = novaValuta;
    })
  }

}
