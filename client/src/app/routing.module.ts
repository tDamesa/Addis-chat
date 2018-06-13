import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

export const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  {path: 'profile/:email/:name', component: ProfileComponent},
  {path: 'profile/:email', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},
  { path: 'users', component: UsersComponent },
  { path: 'users/:term', component: UsersComponent },
  // { path: '', component: LandingPageComponent },
  {
    path: ' 8',
    // canActivate: [AuthGuard],
    children: [
      // { path: '', component: DashboardComponent },
      // { path: 'employee/view/:employeeId', component: EmployeeViewComponent },
      // { path: 'employee/edit/:employeeId', component: EmployeeEditComponent },
      // { path: 'employee/create', component: EmployeeCreateComponent },
      // { path: 'calendar/:employeeId', component: EmployeeCalendarComponent },
      // { path: '**', component: PageNotFoundComponent }
    ]
  }
];
