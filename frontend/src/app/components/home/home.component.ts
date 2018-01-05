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

import {Component} from '@angular/core'

import {AuthService} from '../../services/auth.service'
import {isMobile} from '../../app.component'

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  isMobile: boolean

  info = {
    'Plugin support': `<ul>
    <li>
      In
      <span class="logo">Plug n’ Code</span>, any user, after going through a minimal authentication process, can create and publish a
      plugin in the marketplace to add support for a specific language. This enables the users to go beyond the pre-defined
      capabilities of the application.
    </li>
    <li>
      Each plugin goes through a thorough screening process to ensure no harmful or ill-intended code goes into the system. It
      goes through automated tests to test the structure of the plugin, it is then tested by the admins to test the
      functionality provided by the plugin.
    </li>
  </ul>`,
    'Complex execution environments': `<ul>
    <li>
      In
      <span class="logo">Plug n’ Code</span> the goal is to provide pre-defined environments as well as the option to tailor the execution
      environment specific to the project’s needs.
    </li>
  </ul>`,
    'Secure execution of code': `<ul>
    <li>
      Each build of a project in
      <span class="logo">Plug n’ Code</span> runs on a separate isolated docker instance to make sure no system specific issues interfere
      with the job.
    </li>
    <li>
      This ensures safety of the project data and all kinds of output or logs are directly forwarded to the user’s browser window
      without being persisted in any kind of data storage medium.
    </li>
  </ul>`
  }
  headers = Object.keys(this.info)
  environments = ['Java', 'Python', 'PHP', 'Ruby']
  environmentCls = {
    Java: 'java-original.svg',
    Python: 'python-original.svg',
    PHP: 'php-original.svg',
    Ruby: 'ruby-original.svg'
  }

  constructor(private authService: AuthService) {
    this.isMobile = isMobile
  }

  ngAfterViewInit() {
    $('.cards .card').dimmer({
      on: 'hover'
    })
  }

  isNotLoggedIn(): boolean {
    return this.authService.getRole() == null
  }

  getIdenticon(value: string): string {
    let size = this.isMobile ? 90 : 120
    let obj = {
      value, size
    }
    return JSON.stringify(obj)
  }

}
