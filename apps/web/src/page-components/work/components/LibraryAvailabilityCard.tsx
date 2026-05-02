import Image from 'next/image';
import Link from 'next/link';

import type { LibraryBranchDetailData, WorkItemByLibrary } from '@shared-packages/api';

import { APP_ROUTES } from 'src/lib/routes';
import styles from './LibraryAvailabilityCard.module.scss';
import { ReserveButtonAuthGate } from '../../../../../components/book-detail/ReserveButtonAuthGate';

type Props = {
  branch: LibraryBranchDetailData;
  item: WorkItemByLibrary;
};

export function LibraryAvailabilityCard({ branch, item }: Props) {
  const preview = branch.previewLink || `https://placehold.co/600x400/png?text=Library`;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image src={preview} alt={branch.address} fill sizes="260px" className={styles.img} />
      </div>

      <div className={styles.body}>
        <p className={styles.address}>{branch.address}</p>
        <div className={styles.badge}>В наличии: {item.availableCount}</div>
      </div>

      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <Link className={styles.overlayAction} href={APP_ROUTES.libraryBranch(branch.id)}>
            Перейти
          </Link>

          <ReserveButtonAuthGate
            disabled={item.availableCount <= 0}
            variant="default"
            className={styles.overlayReserveButton}
            context={{ workItemId: item.id, workId: item.workId, libraryBranchId: branch.id }}
          />
        </div>
      </div>
    </div>
  );
}
