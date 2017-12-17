/*
 * Copyright 2017 Yash D. Saraf, Raees R. Mulla and Sachin S. Negi.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Component,
  ViewChild
} from '@angular/core'
import {NgForm} from '@angular/forms'

import {FlashMessagesService} from 'angular2-flash-messages'

import {isMobile} from '../../app.component'
import {LoginService} from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  isMobile: boolean
  username = ''
  password = ''
  remember_me = true
  isHidden = true
  error = ''
  loading = false
  @ViewChild('passwordField') passwordField

  constructor(
    private flashMessagesService: FlashMessagesService,
    private loginService: LoginService
  ) {
    this.isMobile = isMobile
  }

  onPasswordChange() {
    this.isHidden = !this.isHidden
    let element = this.passwordField.nativeElement
    element.type = this.isHidden ? 'password' : 'text'
    element.focus()
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.error = ''
      this.loading = true
      this.loginService.login(this.username, this.password, this.remember_me)
        .then(() => this.loading = false)
        .catch(err => {
          let message
          try {
            let json = JSON.parse(err)
            message = json.error_description
          } catch(e) {
            message = err
          }
          this.error = message
          this.loading = false
        })
    }
  }

}
