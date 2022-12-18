import { Trgovina } from "./trgovina";
import { Vrsta } from "./vrsta";

export class Izdelek {
    'izdelek_id': number;
    'trgovina': Trgovina;
    'vrsta': Vrsta;
    'ime': string;
    'cena': number;
    'zadnja_sprememba': string;
}
