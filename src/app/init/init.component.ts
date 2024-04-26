import { Component } from '@angular/core';
import { LeagueService } from '../core/services/league/league.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {
  constructor(
    private riotService: LeagueService,
    private router: Router,
    private electronService: ElectronService,

  ) { }
  message = 'Hello World!';
  isLolStarted: boolean = false;
  isLolChecked: boolean = false;
  actualFile:string = "";
  actualPercentage = 0;
  async ngOnInit(): Promise<void> {

    this.message = "Checkeando si el lol esta encendido"
    try {
      await this.riotService.init({})
      this.isLolChecked = true;
      this.isLolStarted = true;
      await this.router.navigate(['client']);
    } catch (e) {
      this.isLolChecked = true;
      console.log(e)
    }
  }

}
