import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
    constructor( private powerService: PowerService) {}

    compute(a: number, b: number) {
        console.log('CPU membutuhkan 10 watt');
        this.powerService.supplyPower(10, 'CPU');
        return a + b;
    }

}
