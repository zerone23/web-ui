import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
let APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

export let AppRouterModule = RouterModule.forRoot(APP_ROUTES, { 
    // preloadingStrategy: CustomPreloadingStrategy, // important
   // useHash: true,
   // initialNavigation: false
} );