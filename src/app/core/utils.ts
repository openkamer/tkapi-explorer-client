import { environment } from '../../environments/environment';

export namespace Utils {
  export const API_BASE_URL = environment.apiBaseUrl + '/v1/';
  export const MATOMA_SITE_ID = environment.matomaSiteId;
  export const MATOMA_URL = environment.motomaUrl;
}
