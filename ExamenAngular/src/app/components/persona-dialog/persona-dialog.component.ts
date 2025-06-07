import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaService } from '../../services/persona.service';
import { PuestoService } from '../../services/puesto.service';
import {
  CommonModule
} from '@angular/common';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatDialogModule
} from '@angular/material/dialog';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatIconModule
} from '@angular/material/icon';

@Component({
  selector: 'app-persona-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './persona-dialog.component.html',
  styleUrls: ['./persona-dialog.component.scss']
})
export class PersonaDialogComponent implements OnInit {
  form!: FormGroup;
  puestos: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonaDialogComponent>,
    private personaService: PersonaService,
    private puestoService: PuestoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadPuestos();
    this.initializeForm();
  }

  loadPuestos(): void {
    this.puestoService.getPuestos().subscribe(
      (data) => {
        this.puestos = data;
      },
      (error) => console.error('Error al cargar puestos', error)
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      idPersona: [this.data?.idPersona || null],
      nombre: [this.data?.nombre || '', Validators.required],
      edad: [this.data?.edad || '', [Validators.required, Validators.min(0)]],
      telefono: [this.data?.telefono || '', Validators.required],
      idPuesto: [this.data?.idPuesto || this.data?.puesto?.idPuesto || '', Validators.required]
    });
  }

 
  save(): void {
  if (this.form.invalid || this.isSubmitting) return;

  this.isSubmitting = true;

  // Limpiar el objeto para enviar solo lo necesario al backend
  const formValue = this.form.value;

  const persona = {
    idPersona: formValue.idPersona ?? 0,
    nombre: formValue.nombre,
    edad: +formValue.edad,
    telefono: formValue.telefono,
    idPuesto: +formValue.idPuesto,
    // Si usas estos campos en tu modelo también los incluyes
    fechaNacimiento: formValue.fechaNacimiento ?? null,
    sexo: formValue.sexo ?? null,
    activo: formValue.activo ?? true
  };

  const request$ = persona.idPersona
    ? this.personaService.updatePersona(persona.idPersona, persona)
    : this.personaService.createPersona(persona);

  request$.subscribe({
    next: () => {
      this.isSubmitting = false;
      this.dialogRef.close(true);
    },
    error: (error) => {
      console.error('Error al guardar persona', error);
      this.isSubmitting = false;
      alert('Error al guardar persona:\n' + (error?.error?.title || error?.message));
    }
  });
}


  close(): void {
    this.dialogRef.close();
  }
}
