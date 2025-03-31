import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';

import { filter } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AppComponent } from '../app.component';
import { IPais } from 'src/models/pais.model';
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIcon ]
})
export class HomeComponent implements OnInit {
  loginDisplay = false;
  tabs: { label: string; content: '' }[] = [];
  paises: IPais[] = []
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService, 
    private appComponent: AppComponent,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cargaEstadoSuccessUsuario()
    this.userService.obtenerPaises().subscribe({
      next: (response: IPais[]) => {
        this.paises = response;
      },
      error: (error) => {
        console.error('Error al obtener los países:', error);
      }
    });
  }

  cargaEstadoSuccessUsuario(){
    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
    )
    .subscribe((result: EventMessage) => {
      console.log(result);
      const payload = result.payload as AuthenticationResult;
      this.authService.instance.setActiveAccount(payload.account);
    });

  this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }


  loginMicrosoft(){
    this.appComponent.loginRedirect();
  }

}
