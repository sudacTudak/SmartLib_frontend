import { BookOutlined } from '@ant-design/icons';
import { getSmartlibApi } from '@global/api';
import { APP_ROUTES } from '@global/routes';
import { WorkReservationStatus } from '@shared-packages/enums';
import { TextTag, TextTagColor } from '@shared/ui/components';
import { useQuery } from '@tanstack/react-query';
import {
  HeaderMenuItem,
  HeaderMenuItemType,
  HeaderSubmenuItemType,
  THeaderSubmenuItem,
} from '@widgets/layout/Header/components/HeaderMenuItem';
import { memo, useMemo } from 'react';

const api = getSmartlibApi();

export const UserWorksMenu = memo(function UserWorksMenu() {
  const { data: openReservations = [] } = useQuery({
    queryKey: ['userWorksMenu', 'openWorkReservations'],
    queryFn: () => api.workReservations.list({ status: WorkReservationStatus.Open }),
    refetchInterval: 10_000,
  });
  const favoriteWorksCount = 0;
  const openReservationsCount = openReservations?.length;
  console.group('openReservationCount: ', openReservationsCount);

  const booksMenuItems = useMemo(() => {
    const favoriteWorksBadge =
      favoriteWorksCount > 0 ? <TextTag text={favoriteWorksCount.toString()} color={TextTagColor.Blue} /> : null;
    const reservationsCountBadge =
      openReservationsCount > 0 ? <TextTag text={openReservationsCount.toString()} color={TextTagColor.Blue} /> : null;

    return [
      {
        title: 'Избранное',
        itemType: HeaderSubmenuItemType.Link,
        href: APP_ROUTES.profile.favorite,
        suffix: favoriteWorksBadge,
      },
      {
        title: 'Бронирования',
        itemType: HeaderSubmenuItemType.Link,
        href: APP_ROUTES.profile.reservations,
        suffix: reservationsCountBadge,
      },
    ] as THeaderSubmenuItem[];
  }, [openReservationsCount, favoriteWorksCount]);

  return (
    <HeaderMenuItem
      itemType={HeaderMenuItemType.Submenu}
      title="Мои книги"
      items={booksMenuItems}
      menuTitle="Мои книги"
      icon={<BookOutlined style={{ fontSize: 20 }} />}
    />
  );
});
