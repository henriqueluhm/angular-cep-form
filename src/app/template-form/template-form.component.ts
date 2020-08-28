import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario:any = {
    nome: null,
    email: null
  }

  onSubmit(form) {
    console.log(form)

    //  console.log(this.usuario)
    this.http.post('enderecoServer/formUsuario', JSON.stringify(form.value))
  }



  constructor(private http: HttpClient) { }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched
  }

  ngOnInit(): void {
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo) ,
      'has.feedback': this.verificaValidTouched(campo) 
  }
  }

  consultaCEP(cep, formulario){
    var cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.http.get(`https:viacep.com.br/ws/${cep}/json`)
        .subscribe(data => this.populaDadosForm(data, formulario));
      }
    }
  }

  populaDadosForm(data, formulario){
     formulario.setValue( {
      nome: formulario.value.nome,
      email: formulario.value.email,
      cep: data.cep,
      cidade: data.localidade,
      bairro: data.bairro,
      rua: data.logradouro,
      numero: '',
      complemento: data.complemento
    });

    formulario.form.patchVaule();
  }

}
