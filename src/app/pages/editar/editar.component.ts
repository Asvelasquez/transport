import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor( private progressBarService: ProgressBarService) { }

   ngOnInit() {
    this.progressBarService.progressBarReactiva.next(false);
   



    
    this.progressBarService.progressBarReactiva.next(true);
  }

}
