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
  public kosariceMessage: string = ""

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
    }
    this.storitevZaKosarice.dodajKosarico(novaKosarica).subscribe((dodanaKosarica) => {
      this.kosarice.push(dodanaKosarica)
      this.pridobiKosarice();
    })
  }

}
