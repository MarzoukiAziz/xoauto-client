import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { AdService } from '../ad.service';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
import { StepFourComponent } from './steps/step-four/step-four.component';
import { StepFiveComponent } from './steps/step-five/step-five.component';
import { StepSixComponent } from './steps/step-six/step-six.component';
import { DoneComponent } from './steps/done/done.component';

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [
    MatProgressSpinner,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    DoneComponent,
  ],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
})
export class CreateAdComponent {
  constructor(public _adService: AdService) {}
  steps = [
    '1. Informations de base',
    '2. Caractéristiques du véhicule',
    '3. Équipements',
    '4. Gallerie',
    '5. Contact',
    '6. Prix',
  ];
}
