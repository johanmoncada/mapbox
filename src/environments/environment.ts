import { api } from '@envMapbox/api';

export const environment = {
    mocks: true,
    production: false,
    baseUrlApi: '',
    api: {
        baseUrl: '',
        ...api,
    },
};
