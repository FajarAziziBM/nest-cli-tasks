import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
    constructor( private powerService: PowerService) {}
    getData() {
        console.log('Disk membutuhkan 20 watt untuk membaca data');
        this.powerService.supplyPower(20, 'Disk');
        return 'Data di ambil dari disk';
    }
}


