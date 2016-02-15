/* Copyright IBM Corp. 2015, 2016
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular.module('dialog.component.datetime', ['dialog.service'])

    /**
     * @name datetime
     * @module dialog/component/datetime
     * @description
     *
     * Displays a date & time picker that submits the selected date to the dialogService.
     */
    .directive('datetime', function ($filter, dialogService) {
      return {
        'restrict': 'E',
        'template': '<input type="date" ng-model="date"></input>' +
                    '<input type="time" ng-model="time"></input>' +
                    '<button wea-max-clicks="1">Confirm</button>',
        'scope': true,
        'link': function (scope, element) {
          var button = element.find('button');
          var submit = function () {
            var formattedDate;
            var formattedTime;
            if (scope.date && scope.time) {
              formattedDate = $filter('date')(scope.date, 'MM/dd/yyyy');
              formattedTime = $filter('date')(scope.time, 'HH:mm');
              dialogService.query(formattedDate + ' ' + formattedTime);
            }
          };

          button.bind('touchstart click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            button.addClass('active');
            submit();
          });
        }
      };
    });
}());
