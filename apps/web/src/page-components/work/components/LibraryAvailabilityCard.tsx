import Image from 'next/image';
import Link from 'next/link';

import type { LibraryBranchDetailData } from '@shared-packages/api';

import { APP_ROUTES } from '@global/routes';
import styles from './LibraryAvailabilityCard.module.scss';
import { ReserveModalTrigger } from './ReserveModalTrigger';
import { workCoverPlaceholder260x140Url } from '@shared-packages/ui';
import { TextTag, TextTagColor, TextTagSize } from 'src/shared/ui/components';

interface IProps {
  workId: string
  library: LibraryBranchDetailData;
  availableCount: number;
};

export function LibraryAvailabilityCard({ workId, library, availableCount }: IProps) {
  const preview = library.previewLink || workCoverPlaceholder260x140Url;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image src={preview} alt={library.address} fill sizes="260px" className={styles.img} />
      </div>

      <div className={styles.body}>
        <p className={styles.address}>{library.address}</p>
        <TextTag text={`В наличии: ${availableCount}`} color={TextTagColor.Green} size={TextTagSize.Large}/>
      </div>

      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <Link className={styles.overlayAction} href={APP_ROUTES.libraryBranch(library.id)}>
            Перейти
          </Link>

          <ReserveModalTrigger
            disabled={availableCount <= 0}
            variant="default"
            className={styles.overlayReserveButton}
            context={{ workId, libraryBranchId: library.id }}
          />
        </div>
      </div>
    </div>
  );
}
