export enum Gender {
    Male = 'male',
    Female = 'female'
}

export enum UserRole {
    Admin = 'admin',
    Manager = 'manager',
    Client = 'client'
}

export enum UserPermissions {
    ManagerAdministration = 0,
    ManagerModification = 1,
    EditManagerOnlyPermissions = 2,
    EditAdminPermissions = 3,
    UsersModification = 4,
    UsersAdministration = 5,
    BookBasesAdministration = 6,
    BookBasesModification = 7,
    LibraryBranchesAdministration = 8,
    LibraryBranchesModification = 9,
    BookMovementManagement = 10,
    BookReservationManagement = 11,
    PositionsModification = 12,
    PositionsAdministration = 13,
    StaffPositionsAdministration = 14,
    ManageSuppliers = 15,
    AmenitiesAdministration = 16,
    AmenitiesModification = 17,
    AmenityVendorAdministration = 18,
    AmenityVendorModification = 19,
}

export enum BookLoanStatus {
    Open = 0,
    Closed = 1}

export enum InventoryMovementType {
    In = 'in',
    Out = 'out'}