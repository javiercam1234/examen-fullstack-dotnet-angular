import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDialogComponent } from '../components/global-dialog/global-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  confirmar(titulo: string, mensaje: string): Promise<boolean> {
    const ref = this.dialog.open(GlobalDialogComponent, {
      data: {
        tipo: 'confirmacion',
        titulo,
        mensaje
      }
    });

    return ref.afterClosed().toPromise();
  }

  mensaje(titulo: string, mensaje: string, tipo: 'info' | 'error' = 'info'): void {
    this.dialog.open(GlobalDialogComponent, {
      data: {
        tipo,
        titulo,
        mensaje
      }
    });
  }
}