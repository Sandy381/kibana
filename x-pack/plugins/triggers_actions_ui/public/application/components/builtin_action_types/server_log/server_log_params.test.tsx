/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import { mountWithIntl } from '@kbn/test/jest';
import { ServerLogLevelOptions } from '.././types';
import ServerLogParamsFields from './server_log_params';
import { DocLinksStart } from 'kibana/public';
import { coreMock } from 'src/core/public/mocks';

describe('ServerLogParamsFields renders', () => {
  const mocks = coreMock.createSetup();
  const editAction = jest.fn();

  test('all params fields is rendered', () => {
    const actionParams = {
      level: ServerLogLevelOptions.TRACE,
      message: 'test',
    };
    const wrapper = mountWithIntl(
      <ServerLogParamsFields
        actionParams={actionParams}
        errors={{ message: [] }}
        editAction={editAction}
        index={0}
        defaultMessage={'test default message'}
        docLinks={{ ELASTIC_WEBSITE_URL: '', DOC_LINK_VERSION: '' } as DocLinksStart}
        toastNotifications={mocks.notifications.toasts}
        http={mocks.http}
      />
    );
    expect(editAction).not.toHaveBeenCalled();
    expect(wrapper.find('[data-test-subj="loggingLevelSelect"]').length > 0).toBeTruthy();
    expect(
      wrapper.find('[data-test-subj="loggingLevelSelect"]').first().prop('value')
    ).toStrictEqual('trace');
    expect(wrapper.find('[data-test-subj="messageTextArea"]').length > 0).toBeTruthy();
  });

  test('level param field is rendered with default value if not selected', () => {
    const actionParams = {
      message: 'test message',
      level: ServerLogLevelOptions.INFO,
    };
    const wrapper = mountWithIntl(
      <ServerLogParamsFields
        actionParams={actionParams}
        errors={{ message: [] }}
        editAction={() => {}}
        index={0}
        docLinks={{ ELASTIC_WEBSITE_URL: '', DOC_LINK_VERSION: '' } as DocLinksStart}
        toastNotifications={mocks.notifications.toasts}
        http={mocks.http}
      />
    );
    expect(wrapper.find('[data-test-subj="loggingLevelSelect"]').length > 0).toBeTruthy();
    expect(
      wrapper.find('[data-test-subj="loggingLevelSelect"]').first().prop('value')
    ).toStrictEqual('info');
    expect(wrapper.find('[data-test-subj="messageTextArea"]').length > 0).toBeTruthy();
  });
});
