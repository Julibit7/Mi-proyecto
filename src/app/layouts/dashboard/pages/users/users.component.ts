import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './models/';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'password', 'country', 'email', 'rol', 'comision', 'actions'];
  dataSource: User[] = [
  {
   id: 1,
   firstName: 'Juan',
   lastName: 'Bouza',
   password: '1234',
   country: 'Argentina',
   email: 'jbo@gmail.com',
   rol: 'Teacher',
   comision: 'Advanced',
  },
  {
    id: 2,
    firstName: 'Julieta',
    lastName: 'Benti',
    password: '3455',
    country: 'Japon',
    email: 'julita@gmail.com',
    rol: 'Student',
    comision: 'Advenced',
   },
   {
    id: 3,
    firstName: 'Agustina',
    lastName: 'Gonzalez',
    password: '68904',
    country: 'Uruguay',
    email: 'ags@gmail.com',
    rol: 'Student',
    comision: 'Beginner',
   },
 ];

 editingUser: User | null = null;
 userForm: FormGroup;

 constructor(private fb: FormBuilder) {
   this.userForm = this.fb.group({
     firstName: ['', Validators.required],
     lastName: ['', Validators.required],
     password: ['', Validators.required],
     country: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     rol: ['', Validators.required],
     comision: ['', Validators.required],
   });
 }

 onModify(user: User) {
   this.editingUser = user;
   this.userForm.setValue({
     firstName: user.firstName,
     lastName: user.lastName,
     password: user.password,
     country: user.country,
     email: user.email,
     rol: user.rol,
     comision: user.comision,
   });
 }

 onCancelEdit() {
   this.editingUser = null;
   this.userForm.reset();
 }

 onSaveEdit() {
  if (this.editingUser && this.userForm.valid) {
    this.dataSource = this.dataSource.map(user => 
      user.id === this.editingUser!.id ? { ...this.editingUser, ...this.userForm.value } : user
    );
    
    this.editingUser = null;
    this.userForm.reset();
  }
}
  
  onDelete(user: User) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      console.log('Eliminar usuario:', user);
      this.dataSource = this.dataSource.filter(u => u.id !== user.id);
    }
  }

  onUserSubmitted(ev: User): void {
    this.dataSource = [...this.dataSource, { ...ev, id: new Date().getTime() }];
  }
}
