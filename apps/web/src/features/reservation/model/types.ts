import { ILibraryBranch } from '@shared-packages/api/domains/libraries';

export interface IWorkReservationContext {
  libraryBranchId?: ILibraryBranch['id'];
}
