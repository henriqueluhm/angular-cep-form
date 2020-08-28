import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cep: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      bairro: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null]
    })

  }

  onSubmit() {
    this.http.post('http://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(map(data =>  data))
    .subscribe(data => {
      console.log(data);

      this.resetar();
    },
    (error: any) => alert ('erro'));
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');

    if(campoEmail.errors){
      return campoEmail.errors.required && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string){
    return {
      'has-error': this.verificaValidTouched(campo) ,
      'has.feedback': this.verificaValidTouched(campo) 
  }
  }

  consultaCEP() {

    let cep = this.formulario.get('cep').value;

    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.http.get(`https:viacep.com.br/ws/${cep}/json`)
        .subscribe(data => this.populaDadosForm(data));
      }
    }
  }

  populaDadosForm(data) {

    this.formulario.patchValue({
      cidade: data.localidade,
      estado: data.uf,
      bairro: data.bairro,
      rua: data.logradouro,
      complemento: data.complemento
    })
  }

}
