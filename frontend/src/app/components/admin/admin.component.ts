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
  ViewChild,
  OnInit
} from '@angular/core'

import {AdminService} from '../../services/admin.service'
import {isMobile} from '../../app.component'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidebar') sidebar

  heading: string
  _isOpen = 'dash'
  isMobile: boolean
  search: string

  constructor(private adminService: AdminService) {
    this.isMobile = isMobile
  }

  ngOnInit() {
  }

  get isOpen(): string {
    return this._isOpen
  }

  set isOpen(value: string) {
    this.sidebar.close()
    this._isOpen = value
  }

}
