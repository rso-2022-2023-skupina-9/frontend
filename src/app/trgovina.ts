import { Izdelek } from "./izdelek";

export class Trgovina {
    'ime': string;
    'sedez': string;
    'trgovina_id': number;
    'ustanovitev': string;
    'izdelki': null | Izdelek[];
}
