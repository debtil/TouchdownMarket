import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent {
  cities: any | undefined;
    
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.formGroup = new FormGroup({
            selectedCity: new FormControl<any>(null)
        });
    }
}
