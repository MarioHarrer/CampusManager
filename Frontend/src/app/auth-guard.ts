import {CanActivateFn} from '@angular/router';
import Keycloak from 'keycloak-js';
import {inject} from '@angular/core';


export const authGuard: CanActivateFn = async (route, state)=>{
  const keycloak = inject(Keycloak);

  if(keycloak.authenticated){
    return true;
  }
  await keycloak.login({
    redirectUri: window.location.origin + state.url,
  });

  return true;
}
