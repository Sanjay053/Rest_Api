import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../service/auth-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  dataSource: MatTableDataSource<any>; // Holds the data for the table
  filteredData: any[] = []; // Stores the filtered user data
  searchText: string = ''; // Stores the search text
  totalUsers: number = 0; // Stores the total number of users
  perPage: number = 20; // Number of users per page
  pageSizeOptions: number[] = [10, 20, 50, 100]; // Options for the page size
  currentPage: number = 1; // Current page number
  pageSize: number = 5; // Current page size
  isPopupVisible = false; // Flag to track if the dialog is visible
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference to the paginator element
  @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer!: ViewContainerRef; // Reference to the dialog container element

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>([]); // Initialize the data source with an empty array
  }

  // Opens a dialog for editing a user
  editUser(id: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the user list or perform any necessary actions
    });
  }

  ngOnInit() {
    this.userlist(); // Fetch the initial user data
  }

  // Fetches the user data
  userlist() {
    this.authService.userlist(this.currentPage, this.perPage).subscribe(
      (data: any) => {
        console.log(data);
        this.filteredData = data; // Store the fetched data
        this.dataSource = new MatTableDataSource<any>(data); // Update the data source
        console.log(this.filteredData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Applies pagination based on the selected page
  applyPagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // Update the current page number
    this.pageSize = event.pageSize; // Update the page size
    this.userlist(); // Fetch the user data for the selected page
  }

  // Applies filtering based on the search text
  applyFilter() {
    if (!this.searchText) {
      this.filteredData = this.dataSource.data.slice(); // If search text is empty, use the entire data
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
          ); // Filter the data based on search text
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // Apply pagination to the filtered data
    this.filteredData = this.filteredData.slice(
      this.paginator.pageIndex * this.paginator.pageSize,
      (this.paginator.pageIndex + 1) * this.paginator.pageSize
    );
  }

  // Deletes a user
  deleteUser(userId: number) {
    this.authService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        // Update the filteredData array after deletion
        this.filteredData = this.filteredData.filter((user) => user.id !== userId);
        this.dataSource.data = this.filteredData; // Update the data source
      },
      (error) => {
        console.log('Error deleting user:', error);
        // Handle the error
      }
    );
  }

  // Opens a dialog to display user details
  openPopup(userData: any) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '500px',
      data: userData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Logs out the user
  logout() {
    this.router.navigate(['']);
  }

  // Navigates to the add user page
  goToAddUser() {
    this.router.navigate(['/add']);
  }
}
