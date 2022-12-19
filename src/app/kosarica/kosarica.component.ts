import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Kosarica } from '../kosarica';
import { StoritevZaKosariceService } from '../storitev-za-kosarice.service';

@Component({
  selector: 'app-kosarica',
  templateUrl: './kosarica.component.html',
  styleUrls: ['./kosarica.component.css']
})
export class KosaricaComponent implements OnInit {
  public kosarice: Kosarica[] = [];
  public modalStatus: boolean = false;
  public kosariceMessage: string = "";
  public updateKosaricaModal: boolean = false;
  public currentUpdateKosarica: null | Kosarica = null;

  constructor(private storitevZaKosarice: StoritevZaKosariceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pridobiKosarice();
  }

  private pridobiKosarice = () => {
    this.storitevZaKosarice.pridobiKosarice().subscribe((pridobljeneKosarice) => {
      this.kosarice = pridobljeneKosarice;
    })
  }

  public novaKosaricaForm = new FormGroup({
    ime: new FormControl('', [Validators.required]),
  })

  public dodajKosarico = () => {
    console.log("Dodajam kosarico...", this.novaKosaricaForm.value)
    this.modalStatus = false
    let novaKosarica = new Kosarica();
    if (typeof (this.novaKosaricaForm.value['ime']) == 'string') {
      novaKosarica.ime = this.novaKosaricaForm.value['ime'];
    } else {
      this.kosariceMessage = "Ime kosarice ni pravilno..."
      return
    }
    this.storitevZaKosarice.dodajKosarico(novaKosarica).subscribe((dodanaKosarica) => {
      this.kosarice.push(dodanaKosarica)
      this.pridobiKosarice();
    })
  }

  public beginUrediKosarico = (kosarica: Kosarica) => {
    this.currentUpdateKosarica = kosarica;
    this.updateKosaricaModal = true;
    this.urediKosaricaForm.controls['ime'].setValue(kosarica.ime);
  }

  public urediKosaricaForm = new FormGroup({
    ime: new FormControl(this.currentUpdateKosarica?.ime),
  })

  public urediKosarico = () => {
    this.updateKosaricaModal = false;
    let updatedKosarica = new Kosarica();
    if (this.currentUpdateKosarica?.kosarica_id) {
      updatedKosarica.kosarica_id = this.currentUpdateKosarica.kosarica_id;
    } else {
      this.kosariceMessage = "Kosarice ni mogoce urediti..."
      return
    }
    if (this.currentUpdateKosarica?.izdelki) {
      updatedKosarica.izdelki = this.currentUpdateKosarica?.izdelki
    } else {
      this.kosariceMessage = "Ne morem pridobiti izdelkov..."
      return
    }
    if (typeof (this.urediKosaricaForm.value['ime']) == 'string') {
      updatedKosarica.ime = this.urediKosaricaForm.value['ime'];
    } else {
      this.kosariceMessage = "Ime izdelka ni pravilno..."
      return
    }
    this.storitevZaKosarice.urediKosarico(updatedKosarica).subscribe((urejenaKosarica) => {
      if (this.currentUpdateKosarica != null) {
        let index = this.kosarice.indexOf(this.currentUpdateKosarica);
        if (this.kosarice && index != undefined) {
          this.kosarice[index] = urejenaKosarica;
          this.pridobiKosarice();
        }
      }
    })
  }

  public izbrisiKosarico = (kosarica: Kosarica) => {
    this.storitevZaKosarice.izbrisiKosarico(kosarica.kosarica_id).subscribe(() => {
      console.log("Kosarica uspesno izbrisana.");
      this.pridobiKosarice();
    })
  }

}
