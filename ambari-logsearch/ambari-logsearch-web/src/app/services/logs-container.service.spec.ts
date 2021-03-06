/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {TestBed, inject} from '@angular/core/testing';
import {TranslationModules} from '@app/test-config.spec';
import {StoreModule} from '@ngrx/store';
import {AuditLogsService, auditLogs} from '@app/services/storage/audit-logs.service';
import {ServiceLogsService, serviceLogs} from '@app/services/storage/service-logs.service';
import {AuditLogsFieldsService, auditLogsFields} from '@app/services/storage/audit-logs-fields.service';
import {AuditLogsGraphDataService, auditLogsGraphData} from '@app/services/storage/audit-logs-graph-data.service';
import {ServiceLogsFieldsService, serviceLogsFields} from '@app/services/storage/service-logs-fields.service';
import {
  ServiceLogsHistogramDataService, serviceLogsHistogramData
} from '@app/services/storage/service-logs-histogram-data.service';
import {AppSettingsService, appSettings} from '@app/services/storage/app-settings.service';
import {AppStateService, appState} from '@app/services/storage/app-state.service';
import {ClustersService, clusters} from '@app/services/storage/clusters.service';
import {ComponentsService, components} from '@app/services/storage/components.service';
import {HostsService, hosts} from '@app/services/storage/hosts.service';
import {ServiceLogsTruncatedService, serviceLogsTruncated} from '@app/services/storage/service-logs-truncated.service';
import {TabsService, tabs} from '@app/services/storage/tabs.service';
import {HttpClientService} from '@app/services/http-client.service';
import {ListItem} from '@app/classes/list-item';
import {NodeItem} from '@app/classes/models/node-item';

import {LogsContainerService} from './logs-container.service';

describe('LogsContainerService', () => {
  beforeEach(() => {
    const httpClient = {
      get: () => {
        return {
          subscribe: () => {
          }
        }
      }
    };
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({
          auditLogs,
          serviceLogs,
          auditLogsFields,
          auditLogsGraphData,
          serviceLogsFields,
          serviceLogsHistogramData,
          appSettings,
          appState,
          clusters,
          components,
          hosts,
          serviceLogsTruncated,
          tabs
        }),
        ...TranslationModules
      ],
      providers: [
        AuditLogsService,
        ServiceLogsService,
        AuditLogsFieldsService,
        AuditLogsGraphDataService,
        ServiceLogsFieldsService,
        ServiceLogsHistogramDataService,
        AppSettingsService,
        AppStateService,
        ClustersService,
        ComponentsService,
        HostsService,
        ServiceLogsTruncatedService,
        TabsService,
        LogsContainerService,
        {
          provide: HttpClientService,
          useValue: httpClient
        }
      ]
    });
  });

  it('should create service', inject([LogsContainerService], (service: LogsContainerService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getListItemFromString()', () => {
    it('should convert string to ListItem', inject([LogsContainerService], (service: LogsContainerService) => {
      const getListItemFromString: (name: string) => ListItem = service['getListItemFromString'];
      expect(getListItemFromString('customName')).toEqual({
        label: 'customName',
        value: 'customName'
      });
    }));
  });

  describe('#getListItemFromNode()', () => {
    it('should convert NodeItem to ListItem', inject([LogsContainerService], (service: LogsContainerService) => {
      const getListItemFromNode: (node: NodeItem) => ListItem = service['getListItemFromNode'];
      expect(getListItemFromNode({
        name: 'customName',
        value: '1',
        isParent: true,
        isRoot: true
      })).toEqual({
        label: 'customName (1)',
        value: 'customName'
      });
    }));
  });
});
