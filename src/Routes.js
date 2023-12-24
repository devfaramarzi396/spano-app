import Home from './pages/Home'
import Edit from './pages/Edit'



export const Routes = [

    { path: '/', component: Home, name: 'home'  },
    { path: '/edit/:id', component: Edit, name: 'editProduct' },


]