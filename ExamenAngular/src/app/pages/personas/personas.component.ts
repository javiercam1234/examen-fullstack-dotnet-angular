import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PersonaDialogComponent } from '../../components/persona-dialog/persona-dialog.component';
import { PersonaService } from '../../services/persona.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-personas',
  standalone: true, // ✅ Esto lo hace independiente de NgModules
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  personas: any[] = [];
  columnas: string[] = ['nombre', 'edad', 'telefono', 'puesto', 'acciones'];

  constructor(
    private personaService: PersonaService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas().subscribe(
      (data) => this.personas = data,
      (error) => console.error('Error al cargar personas', error)
    );
  }

  openDialog(persona?: any): void {
    const dialogRef = this.dialog.open(PersonaDialogComponent, {
      width: '400px',
      maxWidth: '500px',   
      data: persona || {}
    });

    

   dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadPersonas();  
    }
  });
  }

 deletePersona(id: number): void {
  this.dialogService.confirmar('Eliminar Persona', '¿Estás seguro de eliminar esta persona?')
    .then(confirmado => {
      if (confirmado) {
        this.personaService.deletePersona(id).subscribe(
          () => {
            this.loadPersonas();
            this.dialogService.mensaje('Eliminado', 'La persona fue eliminada correctamente.', 'info');
          },
          (error) => {
            this.dialogService.mensaje('Error', 'No se pudo eliminar la persona.', 'error');
          }
        );
      }
    });
}
}
