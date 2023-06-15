import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../service/auth-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UpdateComponent } from '../update/update.component';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'activity'];
  dataSource: MatTableDataSource<any>;
  filteredData: any[] = [];
  searchText: string = '';
  totalUsers: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  currentPage: number = 1;
  pageSize: number = 5;
  userData: any;
  userDetailsModal: any;
  isPopupVisible = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer!: ViewContainerRef;


  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  editUser(id: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '400px',
      data: { userId: id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the user list or perform any necessary actions
    });
  }
  

  ngOnInit() {
    this.userlist();
  }

  userlist() {
    this.authService.userlist(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        console.log(data);
        this.filteredData = data;
        this.dataSource = new MatTableDataSource<any>(data);
        this.totalUsers = data.meta.pagination.total;
        console.log(this.filteredData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyPagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.userlist();
  }

  applyFilter() {
    if (!this.searchText) {
      this.filteredData = this.dataSource.data.slice();
    } else {
      this.authService.userlist(1, this.totalUsers).subscribe(
        (data: any) => {
          this.filteredData = data.filter(
            (data: any) =>
              data.id.toString().includes(this.searchText) ||
              data.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
              data.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
              data.gender.toLowerCase().includes(this.searchText.toLowerCase()) ||
              data.status.toLowerCase().includes(this.searchText.toLowerCase())
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.filteredData = this.filteredData.slice(
      this.paginator.pageIndex * this.paginator.pageSize,
      (this.paginator.pageIndex + 1) * this.paginator.pageSize
    );
  }
  
  // editUser(id: any) {
  //  this.openPopup(id)
  // }
  

  deleteUser(userId: number) {
    this.authService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        // Update the filteredData array after deletion
        this.filteredData = this.filteredData.filter((user) => user.id !== userId);
        this.dataSource.data = this.filteredData;
      },
      (error) => {
        console.log('Error deleting user:', error);
        // Handle the error
      }
    );
  }

  openPopup(userData: any) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '400px',
      data: userData
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

  logout() {
    this.router.navigate(['']);
  }

  goToAddUser() {
    this.router.navigate(['/add']);
  }

}
