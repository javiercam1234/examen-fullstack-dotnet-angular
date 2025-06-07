import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-global-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.scss']
})
export class GlobalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GlobalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      tipo: 'confirmacion' | 'info' | 'error',
      titulo?: string,
      mensaje: string
    }
  ) {}

  cerrar(confirmado: boolean = false): void {
    this.dialogRef.close(confirmado);
  }

  get icono(): string {
    switch (this.data.tipo) {
      case 'confirmacion': return 'help_outline';
      case 'info': return 'info';
      case 'error': return 'error_outline';
      default: return 'info';
    }
  }

  
  get iconColor(): string {
    switch (this.data.tipo) {
      case 'confirmacion': return '#f9a825'; // amarillo
      case 'info': return '#1976d2';         // azul
      case 'error': return '#d32f2f';        // rojo
      default: return '#1976d2';
    }
  }

  
}
