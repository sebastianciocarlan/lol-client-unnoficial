import { Component } from '@angular/core';
import { LeagueService } from '../core/services/league/league.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {
  constructor(private riotService:LeagueService,private router:Router) {

  }
  isLolStarted: boolean = false;
  isLolChecked: boolean = false;
  async ngOnInit(): Promise<void> {
    try{
      await this.riotService.init({})
      this.isLolChecked = true;
      this.isLolStarted = true;
      await this.router.navigate(['client']);
    }catch(e){
      this.isLolChecked = true;
      console.log(e)
    }
  }
}
