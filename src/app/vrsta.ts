import { Izdelek } from "./izdelek";

export class Vrsta {
    'vrsta_id': number;
    'vrsta': string;
    'izdelki': null | Izdelek[];
}
