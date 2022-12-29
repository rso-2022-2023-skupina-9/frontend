import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurrencyRequest } from '../currency-request';
import { CurrencyResponse } from '../currency-response';
import { Izdelek } from '../izdelek';
import { Kosarica } from '../kosarica';
import { StoritevZaIzdelkeService } from '../storitev-za-izdelke.service';
import { StoritevZaKosariceService } from '../storitev-za-kosarice.service';
import { Trgovina } from '../trgovina';
import { Vrsta } from '../vrsta';

@Component({
  selector: 'app-primerjalnik-trgovina',
  templateUrl: './primerjalnik-trgovina.component.html',
  styleUrls: ['./primerjalnik-trgovina.component.css']
})
export class PrimerjalnikTrgovinaComponent implements OnInit {
  public trgovina: null | Trgovina = null;
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
    this.pridobiTrgovino(this.id)
    this.pridobiVrste();
    this.pridobiTrgovine();
    this.pridobiKosarice();
  }

  ngOnDestroy(): void {
    this.pridobiTrgovino(this.id)
    this.pridobiVrste();
    this.pridobiTrgovine();
    this.pridobiKosarice();
  }

  private pridobiTrgovino = (id: number) => {
    this.storitevZaIzdelke.pridobiTrgovino(id).subscribe((pridobljenaTrgovina) => {
      this.trgovina = pridobljenaTrgovina
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
      this.trgovina?.izdelki?.push(dodanIzdelek)
      this.pridobiTrgovino(this.id);
    })
  }

  public beginIzdelekUpdate = (izdelek: Izdelek) => {
    this.currentUpdateIzdelek = izdelek;
    this.updateIzdelekModal = true;
    this.urediIzdelekForm.controls['trgovina'].setValue(this.trgovina?.trgovina_id);
    this.urediIzdelekForm.controls['vrsta'].setValue(izdelek.vrsta.vrsta_id);
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
        let index = this.trgovina?.izdelki?.indexOf(this.currentUpdateIzdelek);
        if (this.trgovina && this.trgovina.izdelki && index != undefined) {
          this.trgovina.izdelki[index] = urejenIzdelek;
          this.pridobiTrgovino(this.id);
        }
      }
    })
  }

  public izbrisiIzdelek = (izdelek: Izdelek) => {
    console.log("Brisem izdelek:", izdelek);
    this.storitevZaIzdelke.izbrisiIzdelek(izdelek.izdelek_id).subscribe((response) => {
      console.log(response)
      if (response.status === 204) {
        let index = this.trgovina?.izdelki?.indexOf(izdelek);
        if (index != undefined) {
          this.trgovina?.izdelki?.splice(index, 1);
          this.pridobiTrgovino(this.id);
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